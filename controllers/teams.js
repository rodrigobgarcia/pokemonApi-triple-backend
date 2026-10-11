const Team = require("../models/team");
const ForbiddenError = require("../errors/ForbiddenError");
const BadRequestError = require("../errors/BadRequestError")
const { UPDATE_OPTIONS, TEAM_SIZE } = require("../utils/constants");

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

const addMember = (req, res, next) => {
    const member = req.body;
    Team.findById(req.params.teamId)
        .orFail()
        .then((team) => {
            if (team.owner.toString() !== req.user._id) {
                return next(new ForbiddenError('Você não pode alterar este time'));
            }
            if (team.members.some((item) => item.id === member.id)) {
                return next (new BadRequestError("Este Pokemon já está no time"));
            }
            if (team.members.length >= TEAM_SIZE) {
                return next (new BadRequestError("Estime time já está completo"));
            }
            team.members.push(member);
            return team.save()
                .then((savedTeam) => res.send(savedTeam));
        })
        .catch(next)
}

const removeMember = (req, res, next) => {
    const pokemonId = toString(req.params.pokemonId)

    Team.findById(req.params.teamId)
        .orFail()
        .then((team) => {
            if (team.owner.toString() !== req.user._id) {
                return next(new ForbiddenError('Você não pode alterar este time'));
            }
            team.members = team.members.filter((item) => item.id !== pokemonId);
            return team.save()
                .then((savedTeam) => res.send(savedTeam));
        })
        .catch(next);
};

module.exports = { getTeams, createTeam, deleteTeam, renameTeam, addMember, removeMember };