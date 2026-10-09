const jwt = require('jsonwebtoken');
const {UnauthorizedError} = require('../errors/UnauthorizedError');

const {JWT_SECRET} = require("../utils/config") ;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Autorização necessária'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error(error.message);
    return next(new UnauthorizedError('Autorização necessária'));
  }

  req.user = payload;

  return next();
};

module.exports = { auth };