'use strict';

const express = require("express");

const app = express();

const helmet = require("helmet");

app.use(helmet());

const cors = require('cors');

app.use(cors());

const compression = require('compression');

app.use(compression());

const morgan = require('morgan');

app.use(morgan('combined'));

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

app.use(
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
  })
);

app.use(
  helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  })
);

app.use(
  helmet.referrerPolicy({ 
    policy: 'same-origin' 
  })
);

app.use(
  helmet.frameguard({
    action: 'deny'
  })
);

app.use(
  helmet.noSniff()
);

app.use(
  helmet.noCache()
);

app.use(
  helmet.xContentTypeOptions()
);

app.use(
  helmet.crossOriginResourcePolicy()
);

app.use(
  helmet.dnsPrefetchControl()
);

app.use(
  helmet.hidePoweredBy()
);

app.use(
  helmet.featurePolicy({
    features: {
      fullscreen: ["'self'"],
      vibrate: ["'none'"],
      payment: ["'none'"],
      syncXhr: ["'none'"]
    }
  })
);

app.use(
  helmet.expectCt({
    enforce: true,
    maxAge: 30
  })
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});