// File: src/services/ktypeMasterMatcher.ts
import { CarDetails, KtypeMasterRecord } from '../types';
import { YearUtils } from '../utils/yearUtils';

export class KtypeMasterMatcher {
  constructor(
    private ktypemasterData: KtypeMasterRecord[],
    private addLog: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void
  ) {}

  findBestMatch(carDetails: CarDetails): KtypeMasterRecord | null {
    if (!this.ktypemasterData || !carDetails || !carDetails.make || !carDetails.model) {
      return null;
    }
    
    const { make, model, year } = carDetails;
    this.addLog(`🔍 Searching for: ${make} ${model} (${year})`, 'info');
    
    // Step 1: Filter by make with special handling for MINI
    let candidates: KtypeMasterRecord[] = [];
    if (make.toLowerCase() === 'mini') {
      candidates = this.ktypemasterData.filter(row => 
        row.COMPANY?.toLowerCase() === 'bmw' && 
        row.MODEL?.toLowerCase().includes('mini')
      );
      this.addLog(`🔄 Special MINI handling: searching BMW models containing "mini"`, 'info');
    } else {
      candidates = this.ktypemasterData.filter(row => 
        row.COMPANY?.toLowerCase() === make.toLowerCase()
      );
    }

    if (candidates.length === 0) {
      this.addLog(`❌ No candidates found for make "${make}"`, 'error');
      return null;
    }
    
    // Step 2: Try tiered model matching
    const normalizeModelForSearch = (modelStr: string) => 
      modelStr.toLowerCase()
        .replace(/[-\s]/g, '')
        .replace(/convertible/g, 'convertable')
        .replace(/\d+/g, (match) => match.replace(/[-]/g, ''));
    
    const searchModel = normalizeModelForSearch(model);

    let modelMatches = candidates.filter(row => 
      normalizeModelForSearch(row.MODEL || '') === searchModel
    );

    if (modelMatches.length === 0) {
      modelMatches = candidates.filter(row => {
        const baseModel = (row.MODEL || '').replace(/\s*\([^)]*\)/g, '').trim();
        const normalizedBase = normalizeModelForSearch(baseModel);
        return normalizedBase === searchModel || 
               normalizedBase.includes(searchModel) || 
               searchModel.includes(normalizedBase);
      });
    }

    if (modelMatches.length === 0) {
      this.addLog(`❌ No model matches found for "${model}" in make "${make}"`, 'error');
      return null;
    }
    
    this.addLog(`✅ Found ${modelMatches.length} potential model matches`, 'success');

    // Step 3: Apply year matching logic
    if (year) {
      const yearMatches = modelMatches.filter(row => 
        YearUtils.checkYearMatch(year, row.YEAR)
      );

      if (yearMatches.length === 0) {
        this.addLog(`⚠️ Found model matches, but NONE overlap with year "${year}". Item is unmatched.`, 'warning');
        const availableYears = modelMatches.map(row => row.YEAR).filter(Boolean);
        this.addLog(`💡 Available years for ${make} ${model}: ${[...new Set(availableYears)].join(', ')}`, 'info');
        return null;
      }

      if (yearMatches.length === 1) {
        const bestMatch = yearMatches[0];
        this.addLog(`✅ Found a single, unambiguous year match: ${bestMatch.COMPANY} ${bestMatch.MODEL} (${bestMatch.YEAR}) -> ${bestMatch.Template}`, 'success');
        return bestMatch;
      }

      if (yearMatches.length > 1) {
        this.addLog(`🔄 Found ${yearMatches.length} ambiguous year matches. Calculating best overlap...`, 'info');
        
        const productRange = YearUtils.parseYearRange(year);
        if (!productRange) {
          this.addLog('⚠️ Could not parse product year to resolve ambiguity. Returning first match.', 'warning');
          return yearMatches[0];
        }

        let bestMatch: KtypeMasterRecord = yearMatches[0];
        let highestScore = -1;

        yearMatches.forEach(match => {
          const csvRange = YearUtils.parseYearRange(match.YEAR);
          if (csvRange) {
            const intersectionStart = Math.max(productRange[0], csvRange[0]);
            const intersectionEnd = Math.min(productRange[1], csvRange[1]);
            const score = intersectionEnd - intersectionStart;
            
            this.addLog(`   - Candidate: ${match.YEAR}, Score: ${score}`, 'info');

            if (score > highestScore) {
              highestScore = score;
              bestMatch = match;
            }
          }
        });
        
        this.addLog(`✅ Best match by overlap score: ${bestMatch.COMPANY} ${bestMatch.MODEL} (${bestMatch.YEAR}) -> ${bestMatch.Template}`, 'success');
        return bestMatch;
      }
    }
    
    this.addLog(`⚠️ No product year provided. Returning first model match.`, 'warning');
    return modelMatches[0];
  }
}