const winston = require("./winston");

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind =
    typeof port === "string"
      ? "Pipe: " + global.config.PORT
      : "Port: " + global.config.PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      winston.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      winston.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = global.server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  winston.info("Server is listening on " + bind);
}

module.exports = {
  onError,
  onListening,
};
