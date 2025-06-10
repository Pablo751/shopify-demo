// File: src/utils/carDetailsParser.ts
import { CarDetails } from '../types';

const KNOWN_MAKES = [
  'Alfa Romeo', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'BYD', 'Chery', 'Chevrolet', 
  'Chrysler', 'Jeep', 'Citroen', 'Cupra', 'DS Automobiles', 'Dacia', 'DAF', 'Daihatsu', 
  'Dodge', 'Ferrari', 'Fiat', 'Ford', 'Honda', 'Hyundai', 'Ineos', 'Infiniti', 'Isuzu', 
  'Iveco', 'Jaguar', 'Kia', 'Land Rover', 'LDV', 'Lexus', 'Lotus', 'Maserati', 'Mazda', 
  'Mercedes', 'MG', 'MGB', 'Mitsubishi', 'Nissan', 'Peugeot', 'Polstar', 'Porsche', 
  'Renault', 'Rover', 'Saab', 'Seat', 'Skoda', 'Smart', 'Ssangyong', 'Subaru', 'Suzuki', 
  'Tesla', 'Toyota', 'TVR', 'Vauxhall', 'Volkswagen', 'Volvo', 'MINI'
];

export class CarDetailsParser {
  private static identifyMake(text: string): { make: string; remainingText: string } | null {
    const normalizedText = text.toLowerCase();
    const sortedMakes = [...KNOWN_MAKES].sort((a, b) => b.length - a.length);
    
    for (const make of sortedMakes) {
      if (normalizedText.startsWith(make.toLowerCase())) {
        return {
          make: make,
          remainingText: text.substring(make.length).trim()
        };
      }
    }
    
    return null;
  }

  static parseProductDetails(title: string, handle?: string): CarDetails | null {
    try {
      // Parse from title first
      if (title) {
        const titlePatterns = [
          /^(.+?)\s+(.+?)\s*\((\d{4}[-–to\s]+\d{4}|\d{4})(?:\s+(?:Manual|Automatic|Auto))?\)\s*Car\s*Mats/i,
          /^(.+?)\s+(.+?)\s+([A-Z0-9&\s]+?)\s*\((\d{4}[-–to\s]+\d{4}|\d{4})\)\s*Car\s*Mats/i,
          /^(.+?)\s+(.+?)\s*\((\d{4}[-–to\s]+\d{4}|\d{4})\)\s*Car\s*Mats/i,
          /^(.+?)\s+(.+?)\s*\((\d{4}[-–to\s]+\d{4}|\d{4})\)/,
          /^(.+?)\s+(.+?)\s+(\d{4}[-–to\s]+\d{4}|\d{4})/
        ];
        
        for (let i = 0; i < titlePatterns.length; i++) {
          const match = title.match(titlePatterns[i]);
          if (match) {
            const [, rawMake, rawModel, year] = match;
            const makeInfo = this.identifyMake(rawMake + ' ' + rawModel);
            
            if (makeInfo) {
              return {
                make: makeInfo.make,
                model: makeInfo.remainingText || rawModel,
                year: year.trim(),
                source: `title-pattern-${i + 1}`
              };
            }
          }
        }
      }
      
      // Parse from handle as fallback
      if (handle) {
        return this.parseFromHandle(handle);
      }
      
      return null;
    } catch (error) {
      // Silently handle parsing errors
      return null;
    }
  }

  private static parseFromHandle(handle: string): CarDetails | null {
    const cleanHandle = handle
      .replace(/-car-mats.*$/, '')
      .replace(/-manual$/, '')
      .replace(/-automatic$/, '')
      .replace(/-auto$/, '')
      .replace(/-mild-hybrid$/, '')
      .replace(/-hybrid$/, '')
      .replace(/-facelift$/, '');
    
    const parts = cleanHandle.split('-');
    
    // Find year pattern
    let yearIndex = -1;
    let yearRange = '';
    
    for (let i = 0; i < parts.length - 1; i++) {
      if (/^\d{4}$/.test(parts[i]) && /^\d{4}$/.test(parts[i + 1])) {
        yearIndex = i;
        yearRange = `${parts[i]}-${parts[i + 1]}`;
        break;
      }
    }
    
    if (yearIndex === -1) {
      yearIndex = parts.findIndex(part => /^\d{4}$/.test(part));
      if (yearIndex !== -1) {
        yearRange = parts[yearIndex];
      }
    }
    
    const beforeYearParts = yearIndex > 0 ? parts.slice(0, yearIndex) : parts;
    const makeText = beforeYearParts.join(' ');
    const makeInfo = this.identifyMake(makeText);
    
    if (makeInfo) {
      return {
        make: makeInfo.make,
        model: makeInfo.remainingText || '',
        year: yearRange.trim(),
        source: 'handle-smart'
      };
    }
    
    return null;
  }
}