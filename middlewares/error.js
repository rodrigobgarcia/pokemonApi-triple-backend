const errorHandler = (err, req, res, next) => {

  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message});
  }

  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).send({ message: "Dados inválidos" });
  }

  // 3) .orFail() não achou o documento
  if (err.name === "DocumentNotFoundError") {
    return res.status(404).send({ message: "O recurso solicitado não foi encontrado" });
  }

  if (err.code === "11000") {
    return res.status(409).send({ message: "Este email já está cadastrado" });
  }

  console.error(err);
  return res.status(500).send({ message: "Erro no servidor" });
};

module.exports = errorHandler;