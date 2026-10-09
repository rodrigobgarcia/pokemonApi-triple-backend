const mongoose = require("mongoose")

const memberSchema = new mongoose.Schema(
    {
        id: {type: Number, required: true },
        name: { type: String, required: true },
        image: { type: String, default: "" },
        types: { type: [String], default: [] },
    },
    {_id: false},
);

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    members: {
        type: [memberSchema],
        default: [],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },

});

module.exports = mongoose.model("team", teamSchema);