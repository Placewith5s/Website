'use strict';

const https = require('https');
const fs = require('fs');
const express = require('express');
const helmet = require('helmet');
const permissionsPolicy = require("permissions-policy");
const noCache = require('nocache');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();

const privateKey = fs.readFileSync('path/to/private-key.pem', 'utf8');
const certificate = fs.readFileSync('path/to/certificate.pem', 'utf8');
const ca = fs.readFileSync('path/to/ca.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};

const middleware = [
  helmet(),
  noCache(),
  cors(),
  compression(),
  morgan('combined'),
  rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 50
  }),
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdnjs.cloudflare.com'],
      styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: ['https:'],
      blockAllMixedContent: [],
      frameAncestors: ["'none'"],
    },
  }),
  helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }),
  helmet.referrerPolicy({ 
    policy: 'no-referrer' 
  }),
  helmet.frameguard({
    action: 'deny'
  }),
  helmet.noSniff(),
  helmet.xContentTypeOptions(),
  helmet.crossOriginResourcePolicy(),
  helmet.dnsPrefetchControl(),
  helmet.hidePoweredBy()
];

middleware.forEach(m => app.use(m));

app.use(
  permissionsPolicy({
    features: {
      fullscreen: ["self"],
      vibrate: ["none"],
      payment: ["self", '"example.com"'],
      syncXhr: [],
    },
  })
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error!');
});

const PORT = process.env.PORT || 443;

const server = https.createServer(credentials, (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello, secure world!\n');
});

server.listen(port, () => {
  console.log(`Server running on https://localhost:${port}/`);
});
