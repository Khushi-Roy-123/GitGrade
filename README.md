# GitGrade - AI-Powered Repository Analyzer

GitGrade is an intelligent developer tool that analyzes GitHub repositories using advanced AI models. It provides a comprehensive "Mirror Report" for developers, offering a numeric grade, a breakdown of skills (Code Quality, Documentation, Testing, etc.), and a personalized roadmap for improvement.

![GitGrade Screenshot](https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop)

## 🚀 Features

- **🤖 Deep AI Analysis**: Leverages **Gemini 2.0 Flash** (via OpenRouter) to provide senior-level architectural reviews and strategic recommendations.
- **📊 Smart Scoring System**: Evaluates repositories on a 0-100 scale across multiple dimensions:
  - **Code Quality**: Linting, file naming, structure.
  - **Documentation**: README, Contributing guides, License.
  - **Best Practices**: CI/CD pipelines, security checks, test coverage.
- **📈 Visual Metrics**: Interactive Radar and Radial charts to visualize skill distribution at a glance.
- **🗺️ Actionable Roadmap**: Generates a step-by-step specific plan to take the repository to the next level.
- **⚡ Real-time Feedback**: Asynchronous backend processing for fast analysis.

## 🛠️ Tech Stack

**Frontend:**
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Visualization**: Recharts
- **Icons**: Lucide React

**Backend:**
- **Framework**: FastAPI (Python 3.9+)
- **Analysis**: Custom scoring logic + AI Integration
- **Httpx**: Fully async GitHub API and AI model support
- **Pydantic**: Robust data validation

## 📋 Prerequisites

- **Python 3.9** or higher
- **Node.js** 18 or higher (for the frontend)
- An **API Key** from [OpenRouter](https://openrouter.ai/) (Required for the "Deep Analysis" feature).

## ⚡ Quick Start

Follow these steps to get GitGrade running locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Khushi-Roy-123/gitgrade.git
cd gitgrade
```

### 2. Backend Setup

The backend communicates with GitHub and the AI provider.

```bash
# Install Python dependencies
pip install -r requirements.txt

# Run the backend server
uvicorn main:app --reload
```
The backend will start at `http://127.0.0.1:8000`.

### 3. Frontend Setup

The frontend is a modern Vite application.

```bash
# Install Node dependencies
npm install

# Start the development server
npm run dev
```
The frontend will start at `http://localhost:3000` (configured in `vite.config.ts`).

## 🎮 Usage

1.  **Open the App**: Navigate to the frontend URL (`http://localhost:3000`).
2.  **Configure API**: 
    - Click the **Settings (Gear Icon)** in the top right.
    - Enter your **OpenRouter API Key**.
    - Ensure Backend URL is set to `http://localhost:8000/analyze`.
    - Click **Save**.
3.  **Analyze**: Paste any public GitHub repository URL (e.g., `https://github.com/fastapi/fastapi`) and hit Analyze.
4.  **Explore**: View your Grade, Radar Chart, and the detailed **AI Audit Report**.

## 📁 Project Structure

```
├── app/                    # Backend Logic
│   ├── main.py             # FastAPI App definition
│   ├── ai_service.py       # OpenRouter/Gemini integration
│   ├── github_service.py   # GitHub API fetchers
│   ├── scoring.py          # Grading algorithms
│   └── utils.py            # Helpers
├── components/             # React Components
│   ├── AnalyzerForm.tsx    # Input & Validation
│   ├── ResultCard.tsx      # Dashboard & Reports
│   └── ...
├── main.py                 # Backend Entry Point
├── package.json            # Frontend Dependencies
├── vite.config.ts          # Vite Configuration
└── README.md               # Documentation
```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
