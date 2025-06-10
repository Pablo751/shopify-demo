// File: src/components/ShopifyOrderProcessor.tsx
import React, { useState } from 'react';
import { Download, Play, AlertCircle, Truck } from 'lucide-react';
import { DateRangeSelector } from './DateRangeSelector';
import { KtypeMasterManager } from './KtypeMasterManager';
import { ProcessingProgress } from './ProcessingProgress';
import { ResultsSummary } from './ResultsSummary';
import { ProcessingLogs } from './ProcessingLogs';
import { useDemoOrderProcessor } from '../hooks/useDemoOrderProcessor';
import { useKtypeMaster } from '../hooks/useKtypeMaster';
import { DemoShopifyApiService } from '../services/demoShopifyApi';
import { CourierFileGenerator } from '../services/courierFileGenerator';
import { CsvParser } from '../utils/csvParser';
import { DateRange } from '../types';

export const ShopifyOrderProcessor: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  const {
    processing,
    progress,
    currentStep,
    results,
    logs,
    processOrders,
    addLog
  } = useDemoOrderProcessor();

  const {
    ktypemasterData,
    ktypemasterLoading,
    loadDefaultKtypemaster,
    handleKtypemasterUpload
  } = useKtypeMaster(addLog);

  const testConnection = async () => {
    // Use demo service for this demo deployment
    const demoService = new DemoShopifyApiService();
    const result = await demoService.testConnection();
    addLog(`✅ ${result.message}`, 'success');
    if (result.shopInfo) {
      addLog(`Shop: ${result.shopInfo.name} (${result.shopInfo.domain})`, 'info');
    }
  };

  const handleProcessOrders = () => {
    if (ktypemasterData) {
      processOrders(dateRange, ktypemasterData);
    }
  };

  const downloadProcessedOrders = () => {
    if (!results?.processedItems) return;
    
    const publicData = results.processedItems.map(item => {
      const { _courierData, ...rest } = item;
      return rest;
    });
    
    CsvParser.generateCSV(
      publicData, 
      `shopify_orders_processed_${dateRange.startDate}_to_${dateRange.endDate}.csv`
    );
  };

  const downloadCourierFile = () => {
    if (!results?.processedItems) return;
    
    const courierGenerator = new CourierFileGenerator(addLog);
    courierGenerator.generateCourierFile(results.processedItems, dateRange);
  };

  const downloadUnmatchedOrders = () => {
    if (!results?.unmatchedItems) return;
    
    CsvParser.generateCSV(
      results.unmatchedItems,
      `shopify_orders_unmatched_${dateRange.startDate}_to_${dateRange.endDate}.csv`
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Demo Banner */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎯</span>
          <div>
            <h3 className="font-semibold text-gray-900">Demo Version</h3>
            <p className="text-sm text-gray-600">
              This demo uses fictional data to showcase functionality. No real client information is included.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Shopify Order Processor
          <span className="text-lg font-normal text-blue-600 ml-2">(Demo)</span>
        </h1>
        <p className="text-gray-600">
          Process customer orders from Shopify, extract car details, and match against ktypemaster data
        </p>
      </div>

      <KtypeMasterManager
        ktypemasterData={ktypemasterData}
        ktypemasterLoading={ktypemasterLoading}
        onReload={loadDefaultKtypemaster}
        onUpload={handleKtypemasterUpload}
      />

      <DateRangeSelector
        dateRange={dateRange}
        onChange={setDateRange}
      />

      <div className="mb-6 space-y-3">
        <div className="flex gap-3">
          <button
            onClick={testConnection}
            disabled={processing}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4" />
            Test Connection
          </button>
          
          <button
            onClick={handleProcessOrders}
            disabled={processing || !ktypemasterData || !dateRange.startDate || !dateRange.endDate}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            {processing ? 'Processing Orders...' : 'Process Customer Orders'}
          </button>
        </div>
      </div>

      {processing && (
        <ProcessingProgress
          progress={progress}
          currentStep={currentStep}
        />
      )}

      {results && (
        <>
          <ResultsSummary summary={results.summary} />
          
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={downloadProcessedOrders}
              className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Matched Orders ({results.processedItems.length})
            </button>
            
            <button
              onClick={downloadCourierFile}
              className="bg-cyan-600 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <Truck className="w-4 h-4" />
              Download Courier File
            </button>

            {results.unmatchedItems.length > 0 && (
              <button
                onClick={downloadUnmatchedOrders}
                className="bg-orange-600 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Unmatched Orders ({results.unmatchedItems.length})
              </button>
            )}
          </div>
        </>
      )}

      <ProcessingLogs logs={logs} />
    </div>
  );
};