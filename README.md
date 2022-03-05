# GitHub Repositories

### See the project deployed on [Heroku](https://search-github-repos-mokada.herokuapp.com/)

## Features:
* By default, fetches top GitHub repositories and view details
* Users can search GitHub repos by name and view details
* All results link directly to the original GitHub repositories by clicking 'View Repo'
* Responsive web design using Bootstrap
  * View in mobile web and desktop web

## Prerequisites
* Node.js v16.14.0
* Yarn v1.22.17 or npm v8.3.1
* React v17.0.2 (client)

## Built using:
* [React](https://reactjs.org/)
* [Node.js](https://nodejs.org/en/)
* [React-Bootstrap](https://react-bootstrap.github.io/)
* [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* [node-fetch](https://github.com/node-fetch/node-fetch)



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
cd client && yarn build
cd ../
yarn server
```

This will open up window pointing to [http://localhost:4040/](http://localhost:4040/)
