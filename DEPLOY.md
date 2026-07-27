# Publish the GPT Coach dashboard on GitHub Pages

This repository contains an automatic deployment workflow at `.github/workflows/deploy-pages.yml`.

## One-time GitHub Pages setting

1. Open `mslade50/gpt_coach` on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Open **Actions** and run **Deploy Hybrid 400 dashboard to GitHub Pages** if the push-triggered run has not already started.
5. The dashboard will be available at `https://mslade50.github.io/gpt_coach/`.

Every later commit to `main` automatically republishes the site.

## Local use

Open `index.html` or `dashboard.html` directly in a current desktop or mobile browser. The application assets are local to the repository; video demonstrations require an internet connection.
