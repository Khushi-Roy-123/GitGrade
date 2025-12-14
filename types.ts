export interface AnalysisResult {
  repository_name: string;
  score: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Elite';
  summary: string; // Changed to string to match PDF example
  roadmap: string[];
  breakdown: {
    code_quality: number;
    documentation: number;
    testing: number;
    best_practices: number;
    project_structure?: number;
  };
  checklist?: { item: string; status: 'pass' | 'fail' }[];
  tips?: string[];
  detailed_report?: string;
}

export interface ApiError {
  message: string;
}