const routerTeams = require("express").Router();
const { celebrate, Segments } = require("celebrate");
const {
  getTeams,
  createTeam,
  deleteTeam,
  renameTeam,
  addMember,
  removeMember,
} = require("../controllers/teams");
const {
  memberSchema,
  teamBodySchema,
  renameSchema,
  teamIdSchema,
  memberParamsSchema,
} = require("../utils/schemas");

routerTeams.get("/", getTeams);
routerTeams.post("/", celebrate({ [Segments.BODY]: teamBodySchema }), createTeam);
routerTeams.patch(
  "/:teamId",
  celebrate({ [Segments.PARAMS]: teamIdSchema, [Segments.BODY]: renameSchema }),
  renameTeam,
);
routerTeams.delete(
  "/:teamId",
  celebrate({ [Segments.PARAMS]: teamIdSchema }),
  deleteTeam,
);
routerTeams.post(
  "/:teamId/members",
  celebrate({ [Segments.PARAMS]: teamIdSchema, [Segments.BODY]: memberSchema }),
  addMember,
);
routerTeams.delete(
  "/:teamId/members/:pokemonId",
  celebrate({ [Segments.PARAMS]: memberParamsSchema }),
  removeMember,
);

module.exports = routerTeams;
