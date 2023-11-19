const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 4080;

const config = {
    baseURL: externalUrl || `https://localhost:${port}`
  };

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'game.html'));
});

if (externalUrl) {
    const hostname = '0.0.0.0'; //ne 127.0.0.1
    app.listen(port, hostname, () => {
      console.log(`Server locally running at http://${hostname}:${port}/ and from
      outside on ${externalUrl}`);
    });
  }
  else {
  http.createServer(/*{
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
    },*/ app)
    .listen(port, function () {
      console.log(`Server running at http://localhost:${port}/`);
    });
  }