@echo off
REM Step 1: Install git-filter-repo if not present (run manually first if needed)
REM brew install git-filter-repo or download from https://github.com/newren/git-filter-repo/releases

REM Step 2: Remove large files from history (replace BIGFILE with actual path, e.g. public/starboyy.mp4)
git filter-repo --path public/starboyy.mp4 --invert-paths --force

REM Step 3: Force push (WARNING: rewrites history, ok if solo dev)
git push origin --force --all
git push origin --force --tags

REM Step 4: Add back with LFS
git lfs track \"public/*.mp4\"
git lfs track \"public/*.jpg\"
git lfs track \"public/*.png\"
git add .gitattributes
git add public/
git commit -m \"Track media with Git LFS\"
git push origin HEAD:main

REM Clean local cache
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo Done! Run step by step if needed.
