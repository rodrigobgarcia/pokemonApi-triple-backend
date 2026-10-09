const Team = require("../models/team");

const getTeams = (req, res, next) => {
    Team.find({owner: req.user._id})
        .then((teams) => res.send(teams))
        .catch(next);
}

module.exports = { getTeams };