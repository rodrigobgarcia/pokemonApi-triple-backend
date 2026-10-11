const routerTeams = require("express").Router();
const { getTeams, createTeam, deleteTeam, renameTeam, addMember, removeMember } = require("../controllers/teams");
const { signupSchema, signinSchema, memberSchema, teamBodySchema, renameSchema, teamIdSchema, memberParamsSchema } = require("../utils/schemas")

routerTeams.get("/", getTeams);
routerTeams.post("/", createTeam);
routerTeams.delete("/:teamId", deleteTeam);
routerTeams.patch("/:teamId", renameTeam);
routerTeams.post("/:teamId/members", addMember);
routerTeams.delete("/:teamId/members/:pokemonId", removeMember);


module.exports = routerTeams;