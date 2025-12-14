import { AnalysisResult } from '../types';
import { MOCK_RESULT } from '../constants';

export const analyzeRepository = async (repoUrl: string, apiEndpoint: string, apiKey: string, useMock: boolean = false): Promise<AnalysisResult> => {
  if (useMock) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_RESULT), 2000); // Slight delay to simulate AI processing
    });
  }

  try {
    // Explicitly type headers as Record<string, string> to allow dynamic assignment
    const headers: Record<string, string> = {
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
      const errorText = await response.text();
      let errorJson: any;
      try {
        errorJson = JSON.parse(errorText);
      } catch {
        // Response body is not JSON
      }

      const detail = errorJson?.detail;
      let userMessage = `Analysis failed (${response.status})`;

      // Status-specific handling
      if (response.status === 401) {
        userMessage = "Unauthorized: Invalid or missing API Key. Please check your settings.";
      } else if (response.status === 403) {
        userMessage = "Forbidden: Access denied. Check your API key permissions.";
      } else if (response.status === 404) {
        // If the backend explicitly says repository not found (assuming backend returns that in detail), otherwise endpoint issue
        if (detail && typeof detail === 'string' && detail.toLowerCase().includes('repository')) {
          userMessage = "Repository not found. Please ensure the URL is correct and public.";
        } else {
          userMessage = "Resource not found (404). Check the API Endpoint URL in settings.";
        }
      } else if (response.status === 422) {
        userMessage = "Invalid Input: ";
        if (Array.isArray(detail)) {
          userMessage += detail.map((e: any) => e.msg).join(', ');
        } else if (typeof detail === 'string') {
          userMessage += detail;
        } else {
          userMessage += "Please check the repository URL format.";
        }
      } else if (response.status === 429) {
        userMessage = "Rate Limit Exceeded: You are making too many requests. Please wait a moment.";
      } else if (response.status >= 500) {
        userMessage = "Server Error: The backend encountered an issue.";
        if (detail) {
          userMessage += ` Details: ${typeof detail === 'string' ? detail : JSON.stringify(detail)}`;
        }
      } else {
        // Fallback for other errors, prefer detailed message from backend
        if (detail) {
          userMessage = typeof detail === 'string' ? detail : JSON.stringify(detail);
        } else if (errorText) {
          // Truncate very long HTML error pages if they accidentally leak through
          userMessage = `Error: ${errorText.substring(0, 150)}${errorText.length > 150 ? '...' : ''}`;
        }
      }

      throw new Error(userMessage);
    }

    return await response.json();
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error(`Connection failed. Ensure the backend is running at ${apiEndpoint} and is accessible.`);
    }
    throw error;
  }
};