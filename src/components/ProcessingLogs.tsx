// File: src/components/ProcessingLogs.tsx
import React from 'react';
import { FileText } from 'lucide-react';
import { LogEntry } from '../types';

interface ProcessingLogsProps {
  logs: LogEntry[];
}

export const ProcessingLogs: React.FC<ProcessingLogsProps> = ({ logs }) => {
  if (logs.length === 0) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-medium mb-3 flex items-center gap-2">
        <FileText className="w-4 h-4" />
        Processing Log
      </h3>
      <div className="max-h-64 overflow-y-auto space-y-1">
        {logs.map((log, index) => (
          <div key={index} className="flex items-start gap-2 text-sm">
            <span className="text-gray-500 text-xs">{log.timestamp}</span>
            <span className={`
              ${log.type === 'error' ? 'text-red-600' : ''}
              ${log.type === 'warning' ? 'text-orange-600' : ''}
              ${log.type === 'success' ? 'text-green-600' : ''}
              ${log.type === 'info' ? 'text-gray-700' : ''}
            `}>
              {log.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};