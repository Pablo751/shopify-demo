// File: src/components/ResultsSummary.tsx
import React from 'react';
import { ProcessingSummary } from '../types';

interface ResultsSummaryProps {
  summary: ProcessingSummary;
}

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">Total Orders</p>
        <p className="text-2xl font-bold text-blue-600">{summary.totalOrders}</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">Line Items</p>
        <p className="text-2xl font-bold text-green-600">{summary.totalLineItems}</p>
      </div>
      <div className="bg-emerald-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">Matched Items</p>
        <p className="text-2xl font-bold text-emerald-600">{summary.matchedItems}</p>
      </div>
      <div className="bg-orange-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">Unmatched Items</p>
        <p className="text-2xl font-bold text-orange-600">{summary.unmatchedItems}</p>
      </div>
      <div className="bg-purple-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">Match Rate</p>
        <p className="text-2xl font-bold text-purple-600">{summary.matchRate}%</p>
      </div>
    </div>
  );
};
