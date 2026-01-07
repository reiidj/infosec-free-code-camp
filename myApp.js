const express = require('express');
const helmet = require('helmet');
const app = express();

const PORT = process.env.PORT || 3030;

app.use(helmet.hidePoweredBy());

app.use(helmet.frameguard({ action: 'deny' }));

app.use(helmet.xssFilter());

app.use(helmet.noSniff());

app.use(helmet.ieNoOpen());

const timeInSeconds = 90 * 24 * 60 * 60;
app.use(helmet.hsts({
  maxAge: timeInSeconds,
  includeSubDomains: true,
  preload: true
}));

app.use(helmet.dnsPrefetchControl({ allow: false }));

helmet.noCache();
app.use(helmet.noCache());

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", 'trusted-cdn.com'],
    scriptSrc: ["'self'", 'trusted-cdn.com'],
    fontSrc: ["'self'", 'trusted-cdn.com'],
    imgSrc: ["'self'", 'res.cloudinary.com']
  }
}));













































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(PORT, ()=> {
  console.log(`Server is running on port ${PORT}`);
});
