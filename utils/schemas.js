const { Joi } = require("celebrate");

const signupSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const memberSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
    name: Joi.string().required(),
    image: Joi.string().allow(""),
    types: Joi.array().items(Joi.string()),
});

const teamBodySchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    member: memberSchema,
});

const renameSchema = Joi.object({ name: Joi.string().min(2).max(30).required() });

const teamIdSchema = Joi.object({
    teamId: Joi.string().hex().length(24).required(),
});

const memberParamsSchema = Joi.object({
    teamId: Joi.string().hex().length(24).required(),
    pokemonId: Joi.number().integer().positive().required(),
});

module.exports = { signupSchema, signinSchema, memberSchema, teamBodySchema, renameSchema, teamIdSchema, memberParamsSchema };