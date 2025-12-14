def analyze_repository(repo, tree, commits, branches, languages):
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

    # ---------------- Activity ----------------
    commit_count = len(commits)

    if commit_count >= 30:
        score += 20
        summary.append("Healthy commit history with frequent updates.")
    elif commit_count >= 10:
        score += 10
        summary.append("Moderate commit activity.")
    else:
        roadmap.append(
            "Improve commit consistency with small, meaningful commits."
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

    # ---------------- Language Usage ----------------
    if languages:
        top_lang = max(languages, key=languages.get)
        summary.append(f"Primary language: {top_lang}")

    return {
        "score": min(score, 100),
        "summary": summary,
        "roadmap": roadmap,
    }
