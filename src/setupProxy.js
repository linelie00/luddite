// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // 프록시할 API 경로 설정
    createProxyMiddleware({
      target: 'https://opendict.korean.go.kr', // 프록시 대상 주소
      changeOrigin: true,
    })
  );
  app.use(
    '/use', // 프록시할 API 경로 설정
    createProxyMiddleware({
      target: 'http://localhost:8282/', // 프록시 대상 주소
      changeOrigin: true,
    })
  );
};
