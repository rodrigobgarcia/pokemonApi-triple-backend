const bcrypt = require("bcryptjs");
const User = require("../models/user");
const  jwt = require("jsonwebtoken");
const {UnauthorizedError} = require("../errors/UnauthorizedError");
const { JWT_SECRET} = require("../utils/config")

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hashedPassword) => User.create({
      name,
      email,
      password: hashedPassword,
    }))
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;
      return res.status(201).send(userData);
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
    User.findById(req.user._id)
        .orFail()
        .then((user) => res.send(user))
        .catch(next)
};

const login = (req, res, next) => {
  const {email, password} = req.body;

  User.findOne({email})
    .select('+password')
    .then((user) => {
      if(!user) {
        return next(new Error ("Email ou senha incorretos"));
      }
      return bcrypt.compare(password, user.password)
        .then((isValid) => {
          if(!isValid) {
            return next(new UnauthorizedError("Email ou senha incorretos"));
          }
          const token = jwt.sign({_id: user._id}, JWT_SECRET, {expiresIn:"7d"});
          return res.send({token});
        })
    })
    .catch(next);
};

module.exports = { createUser, getCurrentUser, login};