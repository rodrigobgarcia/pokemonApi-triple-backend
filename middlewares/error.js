const { isCelebrateError } = require('celebrate');
const fs = require('fs');
const path = require('path');

const errorLogPath = path.join(__dirname, '..', 'error.log');

const errorHandler = (err, req, res, next) => {
  const errorEntry = {
    date: new Date().toISOString(),
    name: err.name,
    message: err.message,
    path: req.originalUrl,
    method: req.method,
  };

  fs.appendFile(
    errorLogPath,
    `${JSON.stringify(errorEntry)}\n`,
    (writeError) => {
      if (writeError) {
        console.error(writeError);
      }
    },
  );

  if (isCelebrateError(err)) {
    return res.status(400).send({ message: 'Dados inválidos' });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).send({ message: 'Dados inválidos' });
  }

  if (err.name === 'DocumentNotFoundError') {
    return res.status(404).send({ message: 'O recurso solicitado não foi encontrado' });
  }

  if (err.code === 11000) {
    return res.status(409).send({ message: 'Este email já está cadastrado' });
  }

  console.error(err);
  return res.status(500).send({ message: 'Erro no servidor' });
};

module.exports = errorHandler;
