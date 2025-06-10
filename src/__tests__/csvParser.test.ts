// File: __tests__/csvParser.test.ts
import { CsvParser } from '../utils/csvParser';

describe('CsvParser', () => {
  describe('parseCSV', () => {
    it('should parse CSV content correctly', () => {
      const csvContent = `Name,Age,City
John,30,New York
Jane,25,Los Angeles`;

      const result = CsvParser.parseCSV(csvContent);

      expect(result).toEqual([
        { Name: 'John', Age: '30', City: 'New York' },
        { Name: 'Jane', Age: '25', City: 'Los Angeles' }
      ]);
    });

    it('should handle empty lines', () => {
      const csvContent = `Name,Age

John,30
`;

      const result = CsvParser.parseCSV(csvContent);

      expect(result).toEqual([
        { Name: 'John', Age: '30' }
      ]);
    });

    it('should handle missing values', () => {
      const csvContent = `Name,Age,City
John,,New York
Jane,25,`;

      const result = CsvParser.parseCSV(csvContent);

      expect(result).toEqual([
        { Name: 'John', Age: '', City: 'New York' },
        { Name: 'Jane', Age: '25', City: '' }
      ]);
    });
  });
});