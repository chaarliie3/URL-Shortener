require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dns = require('dns');
const url = require('url');
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
  try{
    urlString = req.body['url'];
    const parsedUrl = new URL(urlString);
    let hostname = parsedUrl.hostname;
    dns.lookup(hostname, (err, addresses, family) => {
      if (err) {
        return res.json({error: 'invalid url'});
      }
      idUrl++;
      arrayURLs.push(urlString);
      res.json({original_url: urlString, short_url:idUrl})
    });
  }
  catch(err){
    res.json({error: "invalid url"});
  }
  
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
