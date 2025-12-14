import { AnalysisResult } from '../types';
import { MOCK_RESULT } from '../constants';

export const analyzeRepository = async (repoUrl: string, apiEndpoint: string, apiKey: string, useMock: boolean = false): Promise<AnalysisResult> => {
  if (useMock) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_RESULT), 2000); // Slight delay to simulate AI processing
    });
  }

  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (apiKey) {
      headers['x-api-key'] = apiKey;
    }

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ repo_url: repoUrl }),
    });

    if (!response.ok) {
      let errorMessage = `Analysis failed: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData.detail) {
          errorMessage = Array.isArray(errorData.detail) 
            ? errorData.detail.map((e: any) => e.msg).join(', ') 
            : errorData.detail;
        }
      } catch (e) {
        const text = await response.text();
        if (text) errorMessage += ` ${text}`;
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error(`Could not connect to backend at ${apiEndpoint}. Ensure the server is running.`);
    }
    throw error;
  }
};