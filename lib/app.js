'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _xRay = require('x-ray');

var _xRay2 = _interopRequireDefault(_xRay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(),
    x = (0, _xRay2.default)();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/:url(*)', function (req, res) {
  var url = req.params.url;

  x(url, 'title')(function (err, title) {
    var description = void 0,
        image = void 0;

    res.send('\n      <html>\n        <head>\n          <meta name="twitter:card" content="summary" />\n          <meta name="twitter:title" content="' + title + '" />\n          <meta name="twitter:description" content="' + description + '" />\n          <meta name="twitter:image" content="' + image + '" />\n        </head>\n        <body>\n          <h1>' + title + '</h1>\n          <a href=\'' + url + '\'>' + url + '</a>\n        </body>\n      </html>\n    ');
  });
});

app.listen('8081');