// File: src/components/DateRangeSelector.tsx
import React from 'react';
import { Calendar } from 'lucide-react';
import { DateRange } from '../types';

interface DateRangeSelectorProps {
  dateRange: DateRange;
  onChange: (dateRange: DateRange) => void;
}

export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  dateRange,
  onChange
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Order Date Range</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={dateRange.startDate}
            onChange={(e) => onChange({ ...dateRange, startDate: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={dateRange.endDate}
            onChange={(e) => onChange({ ...dateRange, endDate: e.target.value })}
          />
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mt-2">
        📅 Select the date range for customer orders to process
      </p>
    </div>
  );
};