const Team = require("../models/team");
const ForbiddenError = require("../errors/ForbiddenError");
const { UPDATE_OPTIONS } = require("../utils/constants");

const getTeams = (req, res, next) => {
    Team.find({owner: req.user._id})
        .then((teams) => res.send(teams))
        .catch(next);
}

const createTeam = (req, res, next) => {
    const { name, member } = req.body;
    const owner = req.user._id;

    Team.create({name, members: member ? [member] : [], owner})
        .then((team) => res.status(201).send(team))
        .catch(next);
};

const deleteTeam = (req, res, next) => {
    Team.findById(req.params.teamId)
        .orFail()
        .then((team) => {
            if (team.owner.toString() !== req.user._id) {
                return next(new ForbiddenError('Você não pode deletar esse time'));
            }
            return Team.findByIdAndDelete(req.params.teamId)
                .then((deletedTeam) => res.send(deletedTeam));
        })
        .catch(next);
};

const renameTeam = (req, res, next) => {
    Team.findById(req.params.teamId)
        .orFail()
        .then((team) => {
            if (team.owner.toString() !== req.user._id) {
                return next(new ForbiddenError('Você não pode renomear esse time'));
            }
            return team.findByIdAndUpdate(req.params.teamId, req.body.name, UPDATE_OPTIONS)
                .then((updatedTeam) => res.send(updatedTeam));
        })
        .catch(next);
};

module.exports = { getTeams, createTeam, deleteTeam, renameTeam };