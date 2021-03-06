const dev = process.env.NODE_ENV === 'development';

const app = {
  port: process.env.PORT || 8080,
  baseUrl: dev
    ? `http://localhost:${ process.env.PORT || 8080 }`
    : process.env.BASE_URL
};
const mongodb = {
  debug: process.env.MONGODB_DEBUG || false
};
const express = {
  requestLimit: {
    // limit http request to the server
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 900 // limit each IP to 900 requests per windowMs (60 request / minute)
  }
};
const githubOAuth = {
  githubClient: process.env.GITHUB_KEY,
  githubSecret: process.env.GITHUB_SECRET,
  baseURL: app.baseUrl,
  loginURI: '/auth/github',
  callbackURI: '/auth/github/callback',
  scope: 'user:email',
  allow_signup: true
};

const configs = {
  app,
  mongodb,
  express,
  githubOAuth
};

export default configs;
