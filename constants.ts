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
  ],
  checklist: [
    { item: "Open Source License", status: "pass" },
    { item: ".gitignore Configuration", status: "pass" },
    { item: "README Documentation", status: "pass" },
    { item: "Automated Tests", status: "fail" },
    { item: "Security (No Exposed Secrets)", status: "pass" },
    { item: "Community Standards", status: "fail" }
  ],
  tips: [
    "Consider adding a CONTRIBUTING.md file.",
    "Use prettier to format your code consistent."
  ],
  detailed_report: `# Deep Analysis Report

## Executive Summary
This project is a React-based Todo application designed to demonstrate core frontend concepts. It utilizes a component-based architecture with separate services for API interaction. While functional, it lacks robustness for production environments.

## Architectural Assessment
The project follows a standard modern React structure:
- **Components**: Separated into functional units (TodoList, TodoItem).
- **Services**: API calls are isolated in \`api.ts\`, which is excellent.
- **State Management**: Uses local state (useState), which is appropriate for this scale but might need Redux/Context if scaled up.

## Code Quality & Hygiene Audit
- **Strengths**: Variable naming is clear. Project structure is logical.
- **Weaknesses**: 
  - Missing unit tests for critical business logic.
  - \`any\` types used in several places in TypeScript files.
  - No .editorconfig or linting setup found.

## Audit Checklist Findings
- **Security**: CLEAR. No secrets found.
- **Community**: MISSING. No Contributing guide.

## Strategic Recommendations
1. **Adopt TypeScript Strict Mode**: Fix the \`any\` types to leverage full type safety.
2. **Implement CI/CD**: Add a GitHub Action to run tests on PRs.
3. **Documentation**: Enhance the README to include a "Getting Started" guide.`
};