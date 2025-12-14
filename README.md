# GitGrade - AI-Powered Repository Analyzer

GitGrade is an intelligent developer tool that analyzes GitHub repositories using advanced AI models. It provides a comprehensive "Mirror Report" for developers, offering a numeric grade, a breakdown of skills (Code Quality, Documentation, Testing, etc.), and a personalized roadmap for improvement.

![GitGrade Screenshot](https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop)

## 🚀 Features

- **AI Analysis**: Uses Gemini 2.0 (via OpenRouter) to deeply analyze codebase patterns.
- **Scoring System**: Generates a 0-100 score with a difficulty level (Beginner to Elite).
- **Visual Metrics**: Interactive Radar and Radial charts to visualize skill distribution.
- **Actionable Roadmap**: Generates a step-by-step guide to improve the specific repository.
- **Mock Mode**: Includes a demo mode to visualize results without spending API credits.

## 🛠️ Tech Stack

**Frontend:**
- React 19
- Tailwind CSS (Styling)
- Recharts (Data Visualization)
- Lucide React (Icons)
- ESM Modules (No-build setup)

**Backend:**
- Python 3.9+
- FastAPI
- HTTPX (Async API calls)
- Pydantic

## 📋 Prerequisites

- Python 3.8 or higher
- An API Key from [OpenRouter](https://openrouter.ai/) (or compatible OpenAI-format provider).

## ⚡ Quick Start

### 1. Backend Setup

The backend handles the communication with the AI provider and processes the repository data.

```bash
# Clone the repository
git clone https://github.com/yourusername/gitgrade.git
cd gitgrade

# Install Python dependencies
pip install -r requirements.txt

# Set your API Key (Optional, can also be set via UI)
export OPENROUTER_API_KEY=your_api_key_here

# Run the server
uvicorn main:app --reload
```

The backend will start at `http://127.0.0.1:8000`.

### 2. Frontend Setup

The frontend is built using modern ES modules and imports dependencies directly from CDNs, meaning no complex node_modules or build step is strictly required for development.

You simply need to serve the directory to avoid Cross-Origin (CORS) issues associated with the `file://` protocol.

**Option A: Using Python**
```bash
# In the project root directory
python -m http.server 3000
```
Open `http://localhost:3000` in your browser.

**Option B: Using Node/Serve**
```bash
npx serve .
```

## 🎮 Usage

1. **Configure API**: Click the **Settings (Gear Icon)** in the top right corner.
   - Enter your Backend URL (default: `http://localhost:8000/analyze`).
   - Enter your **OpenRouter/OpenAI API Key**.
   - Click Save.
2. **Analyze**: Paste a public GitHub repository URL (e.g., `https://github.com/facebook/react`) into the input field.
3. **View Results**: Wait for the AI to generate your report, grade, and roadmap.

## 📁 Project Structure

```
├── main.py                 # FastAPI Backend entry point
├── requirements.txt        # Python dependencies
├── index.html              # Frontend entry point
├── index.tsx               # React root
├── App.tsx                 # Main application component
├── types.ts                # TypeScript interfaces
├── constants.ts            # Config and Mock data
├── services/
│   └── api.ts              # API communication logic
└── components/
    ├── AnalyzerForm.tsx    # Input form
    ├── ResultCard.tsx      # Main result display
    ├── ScoreChart.tsx      # Radial score visualization
    ├── DimensionChart.tsx  # Radar/Bar chart for skills
    └── SettingsDialog.tsx  # Configuration modal
```

## 🛡️ License

MIT
