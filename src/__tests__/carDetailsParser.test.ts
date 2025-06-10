// File: __tests__/carDetailsParser.test.ts
import { CarDetailsParser } from '../utils/carDetailsParser';

describe('CarDetailsParser', () => {
  describe('parseProductDetails', () => {
    it('should parse BMW car mats title correctly', () => {
      const title = 'BMW 3 Series (2019-2023) Car Mats';
      const result = CarDetailsParser.parseProductDetails(title);
      
      expect(result).toEqual({
        make: 'BMW',
        model: '3 Series',
        year: '2019-2023',
        source: expect.stringContaining('title-pattern')
      });
    });

    it('should handle MINI as special case', () => {
      const title = 'MINI Cooper (2014-2020) Car Mats';
      const result = CarDetailsParser.parseProductDetails(title);
      
      expect(result?.make).toBe('MINI');
      expect(result?.model).toBe('Cooper');
      expect(result?.year).toBe('2014-2020');
    });

    it('should return null for unparseable titles', () => {
      const title = 'Random Product Name';
      const result = CarDetailsParser.parseProductDetails(title);
      
      expect(result).toBeNull();
    });

    it('should parse from handle when title fails', () => {
      const title = 'Unparseable Title';
      const handle = 'bmw-3-series-2019-2023-car-mats';
      const result = CarDetailsParser.parseProductDetails(title, handle);
      
      expect(result?.make).toBe('BMW');
      expect(result?.model).toContain('3 series');
    });
  });
});