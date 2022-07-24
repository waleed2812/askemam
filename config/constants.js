/* ---------------------------- Backend Specific ---------------------------- */
exports.EXCLUDE_ON_DB_REQUESTS = "-password -__v";

exports.baseURL =
  global.config.NODE_ENV === "local"
    ? "http://localhost:" + global.config.PORT
    : "https://emam-search.herokuapp.com";

exports.baseURLFrontEnd =
  global.config.NODE_ENV === "local"
    ? "http://localhost:3014"
    : "https://emam-search.herokuapp.com";
