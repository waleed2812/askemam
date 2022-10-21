const LOCAL_COMMON = ["ws:"];

const CSP_COMMON = ["'self'", "'unsafe-inline'", "'unsafe-eval'"];

const CSP_DEFAULTS = [...CSP_COMMON, "blob:", "https://fonts.googleapis.com"];

const IMG_SRC = [
  ...CSP_COMMON,
  "data:",
  "blob:",
  "filesystem:",
  "https://i.ytimg.com",
];

module.exports = {
  development: {
    "default-src": [...CSP_DEFAULTS, ...LOCAL_COMMON],
    "img-src": [...IMG_SRC, ...LOCAL_COMMON],
  },
  production: {
    "default-src": CSP_DEFAULTS,
    "img-src": IMG_SRC,
  },
};
