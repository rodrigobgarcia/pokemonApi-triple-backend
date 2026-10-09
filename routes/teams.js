const routerTeams = require("express").Router();
const { getTeams } = require("../controllers/teams");

routerTeams.get("/", getTeams);

module.exports = routerTeams;