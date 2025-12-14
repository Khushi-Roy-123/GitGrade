from app.ai_service import generate_ai_report

async def analyze_repository(repo, tree, commits, branches, languages, api_key: str = None):
    score = 0
    summary = []
    roadmap = []

    # ---------------- Documentation ----------------
    has_readme = any(
        file["path"].lower().startswith("readme")
        for file in tree
        if "path" in file
    )

    if has_readme:
        score += 20
        summary.append("README documentation is present.")
    else:
        roadmap.append(
            "Add a detailed README with project overview, setup steps, and usage."
        )

    # ---------------- Testing ----------------
    has_tests = any(
        "test" in file["path"].lower() or "spec" in file["path"].lower()
        for file in tree
        if "path" in file
    )

    if has_tests:
        score += 20
        summary.append("Test files detected in the repository.")
    else:
        roadmap.append(
            "Learn unit testing and add automated tests (pytest / jest / junit)."
        )



    # ---------------- Version Control ----------------
    if len(branches) > 1:
        score += 20
        summary.append("Uses multiple branches indicating good Git workflow.")
    else:
        roadmap.append(
            "Use feature branches and pull requests to follow Git best practices."
        )

    # ---------------- Project Structure ----------------
    file_count = len(tree)

    if file_count >= 20:
        score += 20
        summary.append("Well-structured project with sufficient files.")
    else:
        roadmap.append(
            "Refactor the project into a clearer folder and module structure."
        )

    # ---------------- Checklist & Best Practices ----------------
    checklist = []
    
    # License Check
    has_license = any(
        "license" in file["path"].lower() or "copying" in file["path"].lower() 
        for file in tree if "path" in file
    )
    checklist.append({
        "item": "Open Source License", 
        "status": "pass" if has_license else "fail"
    })

    # Gitignore Check
    has_gitignore = any(
        ".gitignore" in file["path"].lower() 
        for file in tree if "path" in file
    )
    checklist.append({
        "item": ".gitignore Configuration", 
        "status": "pass" if has_gitignore else "fail"
    })

    # Readme Check (Reuse existing check)
    checklist.append({
        "item": "README Documentation", 
        "status": "pass" if has_readme else "fail"
    })
    
    # Tests Check (Reuse existing check)
    checklist.append({
        "item": "Automated Tests", 
        "status": "pass" if has_tests else "fail"
    })

    # Security Check (Tier 1)
    dangerous_files = {".env", "id_rsa", "id_dsa", ".pem", "secrets.json", "credentials.json"}
    found_dangerous = [
        f["path"] for f in tree 
        if "path" in f and any(f["path"].endswith(bad) for bad in dangerous_files)
    ]
    checklist.append({
         "item": "Security (No Exposed Secrets)",
         "status": "fail" if found_dangerous else "pass"
    })

    # Community Health Check (Tier 1)
    community_files = {"contributing.md", "code_of_conduct.md", "pull_request_template.md"}
    found_community = any(
        f["path"].lower() in community_files 
        for f in tree if "path" in f
    )
    checklist.append({
        "item": "Community Standards",
        "status": "pass" if found_community else "fail"
    })

    # ---------------- Expert Tips (How to Improve) ----------------
    tips = []
    top_lang = max(languages, key=languages.get) if languages else "Unknown"
    
    if top_lang == "Python":
        if not any("requirements.txt" in f["path"].lower() or "pyproject.toml" in f["path"].lower() for f in tree if "path" in f):
            tips.append("Add a `requirements.txt` or `pyproject.toml` for dependency management.")
        tips.append("Use `Black` or `Ruff` for consistent code formatting.")
        tips.append("Add type hints (mypy) to improve code reliability.")
        
    elif top_lang == "TypeScript" or top_lang == "JavaScript":
        if not any("package.json" in f["path"].lower() for f in tree if "path" in f):
            tips.append("Initialize `package.json` to manage project dependencies.")
        tips.append("Use `ESLint` and `Prettier` to catch errors and format code.")
        if top_lang == "JavaScript":
            tips.append("Consider migrating to TypeScript for better type safety.")

    elif top_lang == "Java":
        tips.append("Use `Checkstyle` to enforce coding standards.")
        tips.append("Adopt `Maven` or `Gradle` for build automation.")
        
    if not has_license:
        tips.append("Add a LICENSE file to define how others can use your work (e.g., MIT, Apache 2.0).")
        
    if not has_gitignore:
        tips.append("Add a .gitignore file to prevent checking in unnecessary files (node_modules, __pycache__).")
        
    if found_dangerous:
        tips.append(f"URGENT: Remove exposed secret files immediately: {', '.join(found_dangerous)}")
        
    if not found_community:
        tips.append("Add a CONTRIBUTING.md or CODE_OF_CONDUCT.md to encourage open source contributions.")

    # ---------------- AI Analysis (Tier 3) ----------------
    detailed_report = None
    if api_key:
        detailed_report = await generate_ai_report(repo, tree, checklist, api_key)

    return {
        "score": min(score, 100),
        "summary": summary,
        "roadmap": roadmap,
        "checklist": checklist,
        "tips": tips,
        "detailed_report": detailed_report
    }
