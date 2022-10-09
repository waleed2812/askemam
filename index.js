/* ----------------------------- Loading Logger ----------------------------- */
const winston = require("./config/winston");
winston.info("winston (logger) configuration loaded.");
/* ---------------------- Loading Environment Variables --------------------- */
winston.info("loading environment variables.");
const glob = require("glob");
const dotenv = require("dotenv");
const path = require("path");
winston.info(".env* files are loading...");
glob.sync(".env*").forEach(function (file) {
  const filePath = path.join(__dirname, file);
  dotenv.config({ path: filePath });
  winston.debug(file + " is loaded");
});
/* -------------------------- Global Configuration -------------------------- */
global.config = {};
global.config.NODE_ENV = process.env.NODE_ENV || "local";
winston.info(`running on environment: ${global.config.NODE_ENV}`);
const configPath = `./config/env/${global.config.NODE_ENV}`;
winston.info(`loading config file: ${configPath}`);
const config = require(configPath);
global.config = { ...global.config, ...config };
winston.info(`configuration loaded.`);
/* --------------------------------- Morgan --------------------------------- */
const logger = require("morgan");
logger.token("clientIP", function (req, res) {
  return req.headers["x-forwarded-for"] || "" || req.socket.remoteAddress;
});
/* ---------------------------- Setting up Server --------------------------- */
const express = require("express");
const http = require("http");
const app = express();
if (global.config.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.headers["x-forwarded-proto"] === "https") {
      return next();
    }
    return res.redirect("https://" + req.headers.host + req.url);
  });
}
app.use(
  logger(
    ":date[iso] :clientIP :method :url HTTP/:http-version status=:status - response-time=:response-time ms"
  )
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
global.server = http.createServer(app);
global.server.listen(global.config.PORT);
const listeners = require("./config/listeners");
global.server.on("error", listeners.onError);
global.server.on("listening", listeners.onListening);

/* ---------------------------------- CORS ---------------------------------- */
const { baseURL, baseURLFrontEnd } = require("./config/constants");
const cors = require("cors");
app.use(
  cors({
    origin: [baseURL, baseURLFrontEnd],
    credentials: true,
  })
);
/* ----------------------------------- CSP ---------------------------------- */
const client = "client";
const CSP = require(`./${client}/csp.js`)[global.config.NODE_ENV];
  // console.log(CSP);
const helmet = require("helmet");

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: CSP["default-src"],
      imgSrc: CSP["img-src"],
    },
  },
}));
/* ------------------------------- Web Routes ------------------------------- */
// React App
app.use(express.static(path.join(__dirname, client + "/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, client + "/build", "index.html"));
});
/* --------------------------------- Errors --------------------------------- */
app.use(function (err, req, res, next) {
  winston.error(err);
  if (err) {
    let errorCode = err.msgCode;
    res.status(err.status || 500);
    const resJson = {
      success: false,
      message: err.message
        ? err.message
        : err.msg
        ? err.msg
        : global.errors[errorCode],
      data: err.data ? err.data : {},
    };
    return res.json(resJson);
  } else {
    res.status(err.status || 500);
    return res.json({
      success: false,
      message: "Something went wrong on server Side",
      data: {},
    });
  }
});
/* ----------------- Catch 404 and forward to error handler ----------------- */
app.all("*", function (req, res, next) {
  err = new Error("404 Not Found");
  res.status(err.status || 404);
  winston.error(err);
  return res.json({
    success: false,
    message: err.message ? err.message : err,
    data: {},
  });
});
