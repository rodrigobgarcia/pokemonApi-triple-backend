const routerUsers = require("express").Router();
const { getCurrentUser } = require("../controllers/users");

routerUsers.get("/me", getCurrentUser);

module.exports = routerUsers;