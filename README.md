# GitHub Repositories

## Features:
* By default, fetches top GitHub repositories and view details
* Users can search GitHub repos by name and view details
* All results link directly to the original GitHub repositories by clicking 'View Repo'
* Responsive web design using Bootstrap

## How to run this repo in DEV:

1. Clone repo and install dependencies:
```bash
git clone git@github.com:marissaokada/github-top-repos.git
cd github-top-repos
yarn install
cd client && yarn install
```

2. Create a personal access token on GitHub
* Go to `Settings -> Developer settings -> Personal access tokens -> Generate new token`
* Save this token, should start with the prefix `ghp`


3. Create a `.env` file in the root directory and place the token there with the key `API_TOKEN`:
```bash
API_TOKEN=<YOUR-ACCESS-TOKEN-HERE>
```

4. Run project:
```bash
cd github-top-repos
yarn server
cd client
yarn start
```

This will open up window pointing to [http://localhost:3000/](http://localhost:3000/)
