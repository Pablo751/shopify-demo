// File: src/utils/yearUtils.ts
export class YearUtils {
    static parseYearRange(yearStr: string): [number, number] | null {
      if (!yearStr) return null;
      
      const str = yearStr.toString().trim().toLowerCase();
      const currentYear = new Date().getFullYear();
      
      const normalizedStr = str
        .replace(/present/g, currentYear.toString())
        .replace(/onwards/g, currentYear.toString())
        .replace(/\+/g, `-${currentYear}`)
        .replace(/\s+to\s+/g, '-')
        .replace(/–/g, '-'); // Replace em-dash with hyphen
      
      // Handle range patterns
      const rangeMatch = normalizedStr.match(/(\d{4})\s*[-–to\s]+\s*(\d{4})/);
      if (rangeMatch) {
        return [parseInt(rangeMatch[1]), parseInt(rangeMatch[2])];
      }
      
      // Handle single year
      const singleMatch = normalizedStr.match(/(\d{4})/);
      if (singleMatch) {
        const year = parseInt(singleMatch[1]);
        return [year, year];
      }
      
      return null;
    }
  
    static checkYearMatch(productYear: string, csvYear: string): boolean {
      if (!productYear || !csvYear) return false;
      
      const prodRange = this.parseYearRange(productYear);
      const csvRange = this.parseYearRange(csvYear);
      
      if (!prodRange || !csvRange) {
        return false;
      }
      
      // Check if ranges overlap
      return Math.max(prodRange[0], csvRange[0]) <= Math.min(prodRange[1], csvRange[1]);
    }
  }