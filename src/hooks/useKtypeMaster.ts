// File: src/hooks/useKtypeMaster.ts
import { useState, useCallback, useEffect } from 'react';
import { KtypeMasterRecord } from '../types';
import { CsvParser } from '../utils/csvParser';

export const useKtypeMaster = (addLog: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void) => {
  const [ktypemasterData, setKtypemasterData] = useState<KtypeMasterRecord[] | null>(null);
  const [ktypemasterLoading, setKtypemasterLoading] = useState(false);

  const loadDefaultKtypemaster = useCallback(async () => {
    setKtypemasterLoading(true);
    try {
      const response = await fetch('/ktypemaster3.csv');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const csvContent = await response.text();
      const parsedData = CsvParser.parseCSV<KtypeMasterRecord>(csvContent);
      setKtypemasterData(parsedData);
      addLog(`✅ Auto-loaded ${parsedData.length} records from ktypemaster3.csv`, 'success');
    } catch (error) {
      addLog(`❌ Could not load default ktypemaster: ${error instanceof Error ? error.message : String(error)}`, 'error');
      addLog('💡 You can still upload your own ktypemaster file below', 'info');
    } finally {
      setKtypemasterLoading(false);
    }
  }, [addLog]);

  const handleKtypemasterUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target?.result as string;
        const data = CsvParser.parseCSV<KtypeMasterRecord>(csv);
        setKtypemasterData(data);
        addLog(`📁 Loaded ${data.length} records from uploaded file: ${file.name}`, 'success');
      } catch (error) {
        addLog(`❌ Error loading uploaded ktypemaster: ${error instanceof Error ? error.message : String(error)}`, 'error');
      }
    };
    reader.readAsText(file);
  }, [addLog]);

  useEffect(() => {
    loadDefaultKtypemaster();
  }, [loadDefaultKtypemaster]);

  return {
    ktypemasterData,
    ktypemasterLoading,
    loadDefaultKtypemaster,
    handleKtypemasterUpload
  };
};