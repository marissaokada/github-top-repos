require('dotenv').config();
const express = require('express'),
      fetch = require('node-fetch'),
      path = require('path');

const app = express();

app.use(express.json());

const searchOptions = {
  method: 'get',
  headers: {
    Authorization: `token ${process.env.API_TOKEN}`,
    Accept: 'application/vnd.github.v3+json'
  }
};

app.use('/', express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.post('/api/top/repositories', async (req, res) => {
  const searchQueryString = encodeURIComponent('stars:>20');
  try {
    const response = await fetch(`https://api.github.com/search/repositories?q=${searchQueryString}` + `&order=desc+&page=${req.body.page}&per_page=${req.body.per_page}`, searchOptions)
    const githubData = await response.json();
    return res.status(200).send({ githubData });
  } catch(error) {
    console.error('Error making top repo request', error);
    return res.status(500).send();
  }
});

app.post('/api/search/repositories', async (req, res) => {
  const searchQueryString = encodeURIComponent(`${req.body.searchTerm} in:name sort:stars`);
  try {
    const response = await fetch(`https://api.github.com/search/repositories?q=${searchQueryString}` + `&order=desc+&page=${req.body.page}&per_page=${req.body.per_page}`, searchOptions)
    const githubData = await response.json();
    return res.status(200).send({ githubData });
  } catch(error) {
    console.error('Error making search repo request', error);
    return res.status(500).send('Error making search repo request: ' + error);
  }
});

app.listen(process.env.PORT || 4040, () => {
  console.log(`Server listening!`);
});
