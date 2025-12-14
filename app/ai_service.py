import httpx
import json

OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"
GEMINI_MODEL = "google/gemini-2.0-flash-001"

async def generate_ai_report(repo_metadata: dict, tree: list, checklist: list, api_key: str) -> str:
    """
    Generates a detailed AI analysis report using OpenRouter (Gemini).
    """
    if not api_key:
        return "API Key is missing. Please configure your OpenRouter API Key in the settings to unlock the Deep AI Analysis report."

    # Prepare context for the AI
    repo_name = repo_metadata.get("full_name", "Unknown Repository")
    description = repo_metadata.get("description", "No description provided.")
    
    # Simplify tree for context (limit to top 100 files to avoid token limits if list is huge)
    file_list = [f["path"] for f in tree if "path" in f][:200]
    
    # Checklist summary
    checklist_status = "\n".join([f"- {item['item']}: {item['status'].upper()}" for item in checklist])

    prompt = f"""
    Act as a Senior Principal Software Architect. You are auditing a GitHub repository: '{repo_name}'.
    
    **Project Description**: {description}
    
    **File Structure (Partial)**:
    {json.dumps(file_list, indent=2)}
    
    **Automated Checks**:
    {checklist_status}
    
    **Task**:
    Write a comprehensive "Deep Analysis Report" in Markdown format. The report MUST look professional and include the following sections:
    
    1.  **Executive Summary**: What is this project? Who is it for? Key core technologies identified? (2 paragraphs)
    2.  **Architectural Assessment**: Analyze the structure. Is it modular? Monolithic? Modern? opinionated?
    3.  **Code Quality & Hygiene Audit**: specific praise or critique based on the checklist and file naming conventions.
    4.  **Strategic Recommendations**: High-level advice for the maintainers (e.g. "Adopt CI/CD", "Refactor X").
    
    **Tone**: Professional, constructive, yet critical where necessary. Do not be generic. Use specific file names in your examples.
    """

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                OPENROUTER_API_URL,
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:3000", # Required by OpenRouter
                },
                json={
                    "model": GEMINI_MODEL,
                    "messages": [
                        {"role": "user", "content": prompt}
                    ]
                },
                timeout=30.0
            )
            
            if response.status_code != 200:
                print(f"AI Error: {response.text}")
                return f"AI Analysis failed (Status {response.status_code}). Please check your API Key."
                
            data = response.json()
            return data["choices"][0]["message"]["content"]
            
    except Exception as e:
        print(f"AI Exception: {str(e)}")
        return f"AI Analysis failed due to an error: {str(e)}"
