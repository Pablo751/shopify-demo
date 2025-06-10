// File: src/hooks/useOrderProcessor.ts
import { useState, useCallback } from 'react';
import { ShopifyApiService } from '../services/shopifyApi';
import { OrderProcessor } from '../services/orderProcessor';
import { ProcessingResults, DateRange, KtypeMasterRecord } from '../types';
import { useLogger } from './useLogger';

export const useOrderProcessor = () => {
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
      const shopifyService = new ShopifyApiService();
      const orderProcessor = new OrderProcessor(ktypemasterData, addLog);

      setCurrentStep('Connecting to Shopify...');
      setProgress(10);
      
      const orders = await shopifyService.fetchOrders(dateRange.startDate, dateRange.endDate);
      addLog(`Fetched ${orders.length} orders`, 'success');
      
      if (orders.length === 0) {
        addLog('No orders found in date range', 'warning');
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
      setProgress(30);

      const results = await orderProcessor.processOrders(orders, (progressPercent, step) => {
        setProgress(30 + (progressPercent * 0.7));
        setCurrentStep(step);
      });

      setResults(results);
      setProgress(100);
      setCurrentStep('Complete!');
      addLog(`Processing complete! ${results.processedItems.length} matched, ${results.unmatchedItems.length} unmatched`, 'success');

    } catch (error) {
      addLog(`Error: ${error instanceof Error ? error.message : String(error)}`, 'error');
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