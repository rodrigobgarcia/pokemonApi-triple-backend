const routerTeams = require("express").Router();
const { getTeams, createTeam, deleteTeam, renameTeam } = require("../controllers/teams");

routerTeams.get("/", getTeams);
routerTeams.post("/", createTeam);
routerTeams.delete("/:teamId", deleteTeam);
routerTeams.patch("/:teamId", renameTeam);


module.exports = routerTeams;