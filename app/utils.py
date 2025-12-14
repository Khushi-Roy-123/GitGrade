import re

def parse_github_url(repo_url: str):
    """
    Extracts owner and repository name from a GitHub URL.

    Examples:
    https://github.com/owner/repo
    https://github.com/owner/repo.git
    """

    pattern = r"github\.com/([^/]+)/([^/]+)"
    match = re.search(pattern, repo_url)

    if not match:
        raise ValueError("Invalid GitHub repository URL")

    owner = match.group(1)
    repo = match.group(2).replace(".git", "")

    return owner, repo
