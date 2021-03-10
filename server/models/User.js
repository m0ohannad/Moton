const { Schema, model } = require("mongoose");
const { hashPassword } = require("../helper");
const { nanoid } = require("nanoid");

const UserSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    salt: String
});

UserSchema.pre('save', function (next) {
    if (!this.salt) {
        this.salt = nanoid();
    }

    if (this.password) {
        this.password = hashPassword(this.password, this.salt);
    }

    next();
});

const UserModel = new model('User', UserSchema);

module.exports = UserModel;