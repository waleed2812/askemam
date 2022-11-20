const LOCAL_COMMON = ["ws:"];

const CSP_COMMON = ["'self'", "'unsafe-inline'", "'unsafe-eval'"];

const CSP_DEFAULTS = [...CSP_COMMON, "blob:", "https://fonts.googleapis.com"];

const IMG_SRC = [
  ...CSP_COMMON,
  "data:",
  "blob:",
  "filesystem:",
  "https://i.ytimg.com",
  "https://yt3.ggpht.com",
];

const frameSrc = [
  ...CSP_COMMON,
  "https://youtu.be",
  "https://youtube.com",
  "https://www.youtube.com",
];

const connectSrc = [...CSP_COMMON, "https://raw.githubusercontent.com"];

module.exports = {
  development: {
    "default-src": [...CSP_DEFAULTS, ...LOCAL_COMMON],
    "img-src": [...IMG_SRC, ...LOCAL_COMMON],
    "frame-src": [...frameSrc, ...LOCAL_COMMON],
    "connect-src": [...connectSrc, ...LOCAL_COMMON],
  },
  production: {
    "default-src": CSP_DEFAULTS,
    "img-src": IMG_SRC,
    "frame-src": frameSrc,
    "connect-src": connectSrc,
  },
};
