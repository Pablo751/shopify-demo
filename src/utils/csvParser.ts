// File: src/utils/csvParser.ts
export class CsvParser {
    static parseCSV<T = Record<string, string>>(csvContent: string): T[] {
      const lines = csvContent.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      
      const data: T[] = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = line.split(',').map(v => v.trim());
        const row: Record<string, string> = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        data.push(row as T);
      }
      return data;
    }
  
    static generateCSV<T extends Record<string, unknown>>(data: T[], filename: string): void {
      if (!data || data.length === 0) return;
      
      const headers = Object.keys(data[0]);
      const csvContent = [
        headers.join(','),
        ...data.map(row => 
          headers.map(header => {
            const value = row[header] || '';
            return `"${value.toString().replace(/"/g, '""')}"`;
          }).join(',')
        )
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    }
  }