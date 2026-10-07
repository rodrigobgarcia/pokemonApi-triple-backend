const bcrypt = require("bcryptjs");
const User = require("../models/user");

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

module.exports = { createUser, getCurrentUser };