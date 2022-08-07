const LOCAL_COMMON = ["ws:", "http://localhost:3010"];

const CSP_COMMON = ["'self'", "'unsafe-inline'", "'unsafe-eval'"];

const CSP_DEFAULTS = [...CSP_COMMON, "blob:"];

const IMG_SRC = [
  ...CSP_COMMON,
  "data:",
  "blob:",
  "filesystem:",
  "https://i.ytimg.com",
];

module.exports = {
  local: {
    "default-src": [...CSP_DEFAULTS, ...LOCAL_COMMON],
    "img-src": [...IMG_SRC, ...LOCAL_COMMON],
  },
  development: {
    "default-src": CSP_DEFAULTS,
    "img-src": IMG_SRC,
  },
  production: {
    "default-src": CSP_DEFAULTS,
    "img-src": IMG_SRC,
  },
};
