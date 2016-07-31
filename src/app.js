import express from 'express';
import Xray from 'x-ray';

let app = express(),
    port = process.env.PORT || 8081,
    x = Xray();

app.get('/', (req, res) => {
  res.send(`Hello World!`);
});

app.get('/:url(*)', (req, res) => {
  const url = req.params.url;

  if (req.headers['user-agent'].indexOf('Twitterbot') > -1) {
    // when twitter calls, show them the card
    x(url, {
      title: 'title',
      text: ['p'],
      image: 'img@src'
    })((err, obj) => {
      const { title, text, image } = obj,
            description = text.join(' ').substring(0, 300);

      res.send(`
        <html>
          <head>
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content="${title}" />
            <meta name="twitter:description" content="${description}" />
            <meta name="twitter:image" content="${image}" />
          </head>
        </html>
      `);
    });
  } else {
    res.redirect(url);
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
