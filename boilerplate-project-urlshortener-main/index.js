require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
let idUrl = 0;
let arrayURLs = []
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));


app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.post('/api/shorturl', function(req, res) {
  urlString = req.body['url'];
  idUrl++;
  arrayURLs.push(urlString);
  res.json({original_url: urlString, short_url:idUrl})
});

app.get('/api/shorturl/:id', function(req, res) {
  res.redirect(arrayURLs[Number(req.params.id)-1]);
});

app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
