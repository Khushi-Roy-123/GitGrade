import React, { useState } from 'react';
import { Search, Github, Loader2 } from 'lucide-react';

interface AnalyzerFormProps {
  onAnalyze: (url: string, useMock: boolean) => void;
  isLoading: boolean;
}

export const AnalyzerForm: React.FC<AnalyzerFormProps> = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState('');
  const [useMock, setUseMock] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url, useMock);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="repo-url" className="block text-sm font-medium text-gray-700 mb-2">
            GitHub Repository URL
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Github className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              id="repo-url"
              className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white"
              placeholder="https://github.com/username/repository"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer text-sm text-gray-500 select-none">
            <input
              type="checkbox"
              checked={useMock}
              onChange={(e) => setUseMock(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span>Use Mock Data (Demo Mode)</span>
          </label>

          <button
            type="submit"
            disabled={isLoading || !url}
            className={`
              flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-medium text-white shadow-lg shadow-blue-500/30 transition-all
              ${isLoading || !url 
                ? 'bg-blue-300 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]'}
            `}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Analyze Repository
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};