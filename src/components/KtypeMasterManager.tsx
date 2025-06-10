// File: src/components/KtypeMasterManager.tsx
import React, { useRef } from 'react';
import { FileText, RefreshCw } from 'lucide-react';
import { KtypeMasterRecord } from '../types';

interface KtypeMasterManagerProps {
  ktypemasterData: KtypeMasterRecord[] | null;
  ktypemasterLoading: boolean;
  onReload: () => void;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const KtypeMasterManager: React.FC<KtypeMasterManagerProps> = ({
  ktypemasterData,
  ktypemasterLoading,
  onReload,
  onUpload
}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-blue-50 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h3 className="font-medium">Ktypemaster Database</h3>
        </div>
        <button
          onClick={onReload}
          disabled={ktypemasterLoading}
          className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded text-sm disabled:bg-gray-400"
        >
          <RefreshCw className={`w-4 h-4 ${ktypemasterLoading ? 'animate-spin' : ''}`} />
          Reload
        </button>
      </div>
      
      {ktypemasterLoading ? (
        <p className="text-blue-600 mt-2">⏳ Loading ktypemaster database...</p>
      ) : ktypemasterData ? (
        <p className="text-green-600 mt-2">
          ✅ Loaded {ktypemasterData.length} records from ktypemaster3.csv
        </p>
      ) : (
        <p className="text-orange-600 mt-2">
          ⚠️ Ktypemaster not loaded. Upload a file below or ensure ktypemaster3.csv exists in public folder.
        </p>
      )}
      
      <div className="mt-3">
        <label className="block text-sm text-gray-600 mb-1">
          Or upload a different ktypemaster file:
        </label>
        <input
          type="file"
          accept=".csv"
          ref={fileRef}
          onChange={onUpload}
          className="text-sm"
        />
      </div>
    </div>
  );
};
