import React, { useState, useEffect } from 'react';
import { AnalyzerForm } from './components/AnalyzerForm';
import { ResultCard } from './components/ResultCard';
import { SettingsDialog } from './components/SettingsDialog';
import { analyzeRepository } from './services/api';
import { AnalysisResult } from './types';
import { AlertCircle, FileCode2, Settings } from 'lucide-react';
import { DEFAULT_API_ENDPOINT } from './constants';

const App: React.FC = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Settings State
  const [apiEndpoint, setApiEndpoint] = useState(DEFAULT_API_ENDPOINT);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const savedUrl = localStorage.getItem('gitanalyze_api_endpoint');
    if (savedUrl) {
      setApiEndpoint(savedUrl);
    }
  }, []);

  const handleSaveSettings = (url: string) => {
    setApiEndpoint(url);
    localStorage.setItem('gitanalyze_api_endpoint', url);
  };

  const handleAnalyze = async (url: string, useMock: boolean) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeRepository(url, apiEndpoint, useMock);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-slate-800 font-sans">
      <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="relative text-center mb-16">
          <div className="absolute right-0 top-0">
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
              title="Configure Backend"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>

          <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl shadow-lg shadow-indigo-100 mb-6 ring-1 ring-indigo-50">
            <FileCode2 className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Git<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Grade</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Your personal AI coding mentor. Paste a repository URL to get a comprehensive <span className="font-semibold text-indigo-600">Mirror Report</span>, grade, and actionable roadmap.
          </p>
        </div>

        {/* Action Section */}
        <div className="max-w-3xl mx-auto">
          <AnalyzerForm onAnalyze={handleAnalyze} isLoading={loading} />
        </div>

        {/* Error State */}
        {error && (
          <div className="max-w-3xl mx-auto mb-8 bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3 text-red-700 animate-fade-in shadow-sm">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold">Analysis Failed</h3>
              <p className="text-sm mt-1 opacity-90">{error}</p>
            </div>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="mt-8">
            <ResultCard data={result} />
          </div>
        )}

        {/* Empty State / Placeholder */}
        {!result && !loading && !error && (
          <div className="text-center py-20 opacity-30">
            <div className="w-16 h-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mx-auto mb-4"></div>
            <p className="text-sm font-medium tracking-wide uppercase">Waiting for input</p>
          </div>
        )}
      </div>

      <SettingsDialog 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        currentUrl={apiEndpoint}
        onSave={handleSaveSettings}
      />
    </div>
  );
};

export default App;