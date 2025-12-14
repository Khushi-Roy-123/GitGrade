import React, { useState, useEffect } from 'react';
import { Settings, X, Save } from 'lucide-react';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentUrl: string;
  onSave: (url: string) => void;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({ isOpen, onClose, currentUrl, onSave }) => {
  const [url, setUrl] = useState(currentUrl);

  useEffect(() => {
    setUrl(currentUrl);
  }, [currentUrl]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-500" />
            Configuration
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); onSave(url); onClose(); }} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Backend API Endpoint</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="http://localhost:8000/analyze"
              required
            />
            <p className="text-xs text-gray-500 mt-2">
              Point this to your running FastAPI instance. Ensure the path (e.g., <code>/analyze</code>) is correct.
            </p>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" />
            Save Configuration
          </button>
        </form>
      </div>
    </div>
  );
};