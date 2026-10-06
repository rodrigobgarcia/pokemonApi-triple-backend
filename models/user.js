const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: (props) => `${props.value} não é uma email válido`,
        },
    },
    password: {
        type: String,
        required: true,
        unique: false,
        validate: {
            validator: function(value) {
                return validator.isStrongPassword(value, {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                });
            },
            message: (props) => `Sua senha não é forte`,
        }
    },
});

module.exports = mongoose.model("user", userSchema);