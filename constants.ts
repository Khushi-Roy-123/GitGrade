import { AnalysisResult } from './types';

export const DEFAULT_API_ENDPOINT = 'http://127.0.0.1:8000/analyze';

// Mock data matching "Example 1" from the PDF
export const MOCK_RESULT: AnalysisResult = {
  repository_name: "rahul-dev-ai/todo-app",
  score: 78,
  level: "Intermediate",
  summary: "Strong code consistency and folder structure; needs more tests and documentation. The project demonstrates good grasp of core concepts but lacks production-readiness features.",
  breakdown: {
    code_quality: 85,
    project_structure: 90,
    documentation: 40,
    testing: 20,
    best_practices: 75
  },
  roadmap: [
    "Add unit tests for core logic components",
    "Improve README.md with setup instructions and screenshots",
    "Introduce CI/CD using GitHub Actions",
    "Refactor monolithic components into smaller, reusable hooks"
  ]
};