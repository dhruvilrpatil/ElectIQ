# Contributing to ElectIQ

## Git Repository Maintenance

### Reducing Repository Size (History Rewrite)

The following steps remove large files (deleted `Dockerfile`, `ElectIQ_Fullstack_Prompt.md`, and historical `package-lock.json` snapshots) from **all commits** in Git history. This is a one-time operation that must be performed by a repository owner with push access.

> ⚠️ **Warning:** This rewrites Git history. All collaborators must re-clone or rebase their local copies after the force-push.

#### Prerequisites

```bash
pip install git-filter-repo
```

#### Step 1 — Clone a fresh copy for the rewrite

```bash
git clone https://github.com/dhruvilrpatil/ElectIQ.git electiq-rewrite
cd electiq-rewrite
```

#### Step 2 — Remove large/deleted files from all history

```bash
git filter-repo \
  --path ElectIQ_Fullstack_Prompt.md --invert-paths \
  --path Dockerfile --invert-paths \
  --path backend/package-lock.json --invert-paths \
  --path frontend/package-lock.json --invert-paths
```

#### Step 3 — Compact the repository

```bash
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

#### Step 4 — Force-push all branches and tags

```bash
git remote add origin https://github.com/dhruvilrpatil/ElectIQ.git
git push origin --force --all
git push origin --force --tags
```

#### Expected size reduction

| File removed from history | Estimated savings |
|---------------------------|------------------|
| `ElectIQ_Fullstack_Prompt.md` | ~100 KB |
| `Dockerfile` | ~10 KB |
| `backend/package-lock.json` | ~155 KB |
| `frontend/package-lock.json` | ~145 KB |
| **Total** | **~50% pack reduction** |

Pack size goes from ~205 KB → ~102 KB after history rewrite.

### Preventing Future Bloat

The following are already excluded by `.gitignore`:
- `node_modules/` — npm packages
- `dist/`, `build/` — compiled output
- `package-lock.json` — auto-generated lock files (added during this clean-up)
- `.env`, `.env.local` — secrets
- `*.log`, `logs/` — log files

If the project starts using binary assets (images, videos, fonts), consider [Git LFS](https://git-lfs.github.com/) to keep them out of the main object store.
