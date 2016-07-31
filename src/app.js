import express from 'express';
import Xray from 'x-ray';

let app = express(),
    x = Xray();

app.get('/', (req, res) => {
  res.send(`Hello World!`);
});

app.get('/:url(*)', (req, res) => {
  const url = req.params.url;

  x(url, 'title')((err, title) => {
    let description,
        image;

    res.send(`
      <html>
        <head>
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="${title}" />
          <meta name="twitter:description" content="${description}" />
          <meta name="twitter:image" content="${image}" />
        </head>
        <body>
          <h1>${title}</h1>
          <a href='${url}'>${url}</a>
        </body>
      </html>
    `);
  });
});

app.listen('8081');
