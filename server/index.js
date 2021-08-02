const express = require('express'),
      fetch = require('node-fetch');

const app = express(),
      PORT = process.env.PORT || 3001;

app.use(express.json());

app.post('/api/top/repositories', async (req, res) => {
  const searchOptions = {
    method: 'get',
    headers: {
      Authorization: 'token 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',
      Accept: 'application/vnd.github.v3+json'
    }
  };
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
  const searchOptions = {
    method: 'get',
    headers: {
      Authorization: 'token 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',
      Accept: 'application/vnd.github.v3+json'
    }
  };
  const searchQueryString = encodeURIComponent(`${req.body.searchTerm} in:name sort:stars`);
  try {
    const response = await fetch(`https://api.github.com/search/repositories?q=${searchQueryString}` + `&order=desc+&page=${req.body.page}&per_page=${req.body.per_page}`, searchOptions)
    const githubData = await response.json();
    return res.status(200).send({ githubData });
  } catch(error) {
    console.error('Error making top repo request', error);
    return res.status(500).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
