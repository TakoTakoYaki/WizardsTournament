const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));

const options = {
    target: 'http://localhost:8080',
    changeOrigin: true,
    logLevel: 'debug'
};

app.use('/', createProxyMiddleware(options));

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT} and forwarding to http://localhost:8080`);
});
