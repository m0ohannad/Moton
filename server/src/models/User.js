const mongoose = require('mongoose');
const { hashPassword } = require("../helper");
const { nanoid } = require("nanoid");
const { Schema } = mongoose;

const UserSchema = Schema({
    name: { type: String },
    email: { type: String, required: true, index: true, unique: true },
    joined: { type: Date, default: new Date() },
    progress: { type: Number, default: 0 },
    password: { type: String, required: true },
    salt: { type: String }
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

UserSchema.methods.toJSON = function() {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.salt;
    return userObject;
};

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;