import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

const nggUrl = 'https://mathsspot.com';

const proxy = createProxyMiddleware({
  target: nggUrl,
  changeOrigin: true,
  secure: true,
  logLevel: 'debug',
  router: function(req) {
    if (req.headers.host === 'https://selfstudybrain.com/') {
      req.headers['X-Forwarded-For'] = ''; 
      req.headers['X-Real-IP'] = '';
      req.headers['Via'] = '';
    }
    return nggUrl;
  }
});

app.use('/', proxy);

const port = process.env.PORT || 24433;
app.listen(port, () => {
  console.log(`roblox is online`);
});