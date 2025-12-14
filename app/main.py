from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from app.utils import parse_github_url
from app.github_service import (
    get_repo_metadata,
    get_repo_languages,
    get_repo_commits,
    get_repo_branches,
    get_repo_tree,
)
from app.scoring import analyze_repository

app = FastAPI(title="GitHub Repository Analyzer")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def read_index():
    return FileResponse("index.html")


class RepoRequest(BaseModel):
    repo_url: str


from fastapi import FastAPI, HTTPException, Header
from fastapi.responses import FileResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# ... imports ...

@app.post("/analyze")
async def analyze_repo(
    data: RepoRequest, 
    x_api_key: str = Header(None, alias="x-api-key")
):
    try:
        # Parse URL
        owner, repo = parse_github_url(data.repo_url)

        # Fetch GitHub data
        repo_metadata = get_repo_metadata(owner, repo)
        languages = get_repo_languages(owner, repo)
        commits = get_repo_commits(owner, repo)
        branches = get_repo_branches(owner, repo)

        default_branch = repo_metadata.get("default_branch", "main")
        tree = get_repo_tree(owner, repo, default_branch)

        # Analyze & score (Now Async & accepts API Key)
        result = await analyze_repository(
            repo=repo_metadata,
            tree=tree,
            commits=commits,
            branches=branches,
            languages=languages,
            api_key=x_api_key  # Pass key from header
        )

        return {
            "repository": f"{owner}/{repo}",
            "score": result["score"],
            "summary": result["summary"],
            "roadmap": result["roadmap"],
            "checklist": result.get("checklist"),
            "tips": result.get("tips"),
            "detailed_report": result.get("detailed_report")
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")
