import { useState, useCallback } from 'react';
import { DemoShopifyApiService } from '../services/demoShopifyApi';
import { OrderProcessor } from '../services/orderProcessor';
import { ProcessingResults, DateRange, KtypeMasterRecord } from '../types';
import { useLogger } from './useLogger';

export const useDemoOrderProcessor = () => {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [results, setResults] = useState<ProcessingResults | null>(null);
  const { logs, addLog, clearLogs } = useLogger();

  const processOrders = useCallback(async (
    dateRange: DateRange,
    ktypemasterData: KtypeMasterRecord[]
  ) => {
    if (!ktypemasterData) {
      addLog('No ktypemaster data available', 'error');
      return;
    }

    setProcessing(true);
    setProgress(0);
    clearLogs();

    try {
      addLog('🚀 Demo Mode: Using sample data', 'info');
      
      const demoShopifyService = new DemoShopifyApiService();

      setCurrentStep('Connecting to Demo Store...');
      setProgress(10);
      
      const connectionResult = await demoShopifyService.testConnection();
      addLog(`✅ ${connectionResult.message}`, 'success');
      
      setCurrentStep('Fetching demo orders...');
      setProgress(25);
      
      const orders = await demoShopifyService.fetchOrders(dateRange.startDate, dateRange.endDate);
      addLog(`📦 Fetched ${orders.length} demo orders`, 'success');
      
      if (orders.length === 0) {
        addLog('⚠️ No orders found in date range', 'warning');
        setResults({ 
          processedItems: [], 
          unmatchedItems: [], 
          summary: { 
            totalOrders: 0, 
            totalLineItems: 0, 
            matchedItems: 0, 
            unmatchedItems: 0, 
            matchRate: '0' 
          } 
        });
        setProgress(100);
        setCurrentStep('Complete - No orders found');
        return;
      }

      setCurrentStep('Processing orders...');
      setProgress(40);
      addLog('🔄 Processing orders through matching algorithm...', 'info');

      // Use the real order processor for demo data
      const orderProcessor = new OrderProcessor(ktypemasterData, addLog);
      
      const filteredResults = await orderProcessor.processOrders(orders, (progressPercent, step) => {
        setProgress(40 + (progressPercent * 0.55));
        setCurrentStep(step);
      });

      setResults(filteredResults);
      setProgress(100);
      setCurrentStep('✅ Demo Processing Complete!');
      addLog(`🎉 Processing complete! ${filteredResults.processedItems.length} matched, ${filteredResults.unmatchedItems.length} unmatched`, 'success');
      addLog(`📈 Match rate: ${filteredResults.summary.matchRate}%`, 'success');

    } catch (error) {
      addLog(`❌ Error: ${error instanceof Error ? error.message : String(error)}`, 'error');
      setCurrentStep('Error occurred');
    } finally {
      setProcessing(false);
    }
  }, [addLog, clearLogs]);

  return {
    processing,
    progress,
    currentStep,
    results,
    logs,
    processOrders,
    addLog
  };
}; 