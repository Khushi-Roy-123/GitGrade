import requests
import os
from dotenv import load_dotenv

load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
HEADERS = {"Authorization": f"token {GITHUB_TOKEN}"} if GITHUB_TOKEN else {}

GITHUB_API_BASE = "https://api.github.com"


def get_repo_metadata(owner: str, repo: str):
    url = f"{GITHUB_API_BASE}/repos/{owner}/{repo}"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    return response.json()


def get_repo_languages(owner: str, repo: str):
    url = f"{GITHUB_API_BASE}/repos/{owner}/{repo}/languages"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    return response.json()


def get_repo_commits(owner: str, repo: str):
    url = f"{GITHUB_API_BASE}/repos/{owner}/{repo}/commits"
    response = requests.get(url, headers=HEADERS, params={"per_page": 100})
    response.raise_for_status()
    return response.json()


def get_repo_branches(owner: str, repo: str):
    url = f"{GITHUB_API_BASE}/repos/{owner}/{repo}/branches"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    return response.json()


def get_repo_tree(owner: str, repo: str, branch: str):
    url = f"{GITHUB_API_BASE}/repos/{owner}/{repo}/git/trees/{branch}"
    response = requests.get(url, headers=HEADERS, params={"recursive": "1"})
    response.raise_for_status()
    return response.json().get("tree", [])
