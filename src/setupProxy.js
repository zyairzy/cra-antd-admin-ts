// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/v1/console',
    createProxyMiddleware({
      target: 'http://127.0.0.1:4523/m1/2656303-0-default',
      changeOrigin: true,
      // pathRewrite: { '^/mock/vi/console': '' },
    })
  );
};
