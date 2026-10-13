const fs = require('fs');
const path = require('path');

const requestLogPath = path.join(__dirname, '..', 'request.log');

const requestLogger = (req, res, next) => {
  const entry = {
    date: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
  };

  fs.appendFile(
    requestLogPath,
    `${JSON.stringify(entry)}\n`,
    (error) => {
      if (error) {
        return next(error);
      }

      return next();
    },
  );
};

module.exports = requestLogger;
