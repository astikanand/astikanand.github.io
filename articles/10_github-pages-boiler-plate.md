---
permalink: articles/make-your-own-github-pages-website
topic: make-your-own-github-pages-website
---

## Make Your Own Github Pages Website

Detailed steps for hosting your static website or project repo on **Github** using **Github Pages**. 


#### Step-1: Requirements
- ruby 2.1.x or higher
```
brew install ruby
```
- Bundler
```
gem install bundler
```


#### Step-2: Working repository
- **[Clone or download this repository](https://github.com/astikanand/github-pages-boilerplate)**
- Install Jekyll and other dependencies
Go to repo directory and then do
```
bundle install
```


#### Step-3: Git Setup
- Initialize git
```
git init
```
- Add remote of your remote repository
```
git remote add origin https://github.com/username/repo.git
```


#### Step-4: Build and Run Locally
- Only Build
```
bundle exec jekyll build
```
- Build and run locally
```
bundle exec jekyll serve
```
- Excess the site locally
[localhost:4000](localhost:4000)


#### Step-5: Push Changes and Deploy 
- Commit and Push Changes
```
git commit -m "your commit message"
git push
```
- **Final Deploy:** Go to `settings` of your repository and under **GitHub Pages** section, select your **Source**.
- Your pages will be deployed and url will be given just above Source.
- Hit the url and if it gives 404, then you may need to **wait for 2-3 minutes**.





---

