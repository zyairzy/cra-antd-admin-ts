// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/mock/api/v1',
    createProxyMiddleware({
      target: 'http://localhost:4523',
      changeOrigin: true,
      pathRewrite: { '^/mock/api/v1': '' },
    })
  );
};
