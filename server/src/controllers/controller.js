const jwt = require('jsonwebtoken');
const joi = require('joi');
const { hashPassword } = require('../helper');
const UserModel = require('../models/User');

const userController = {};

userController.register = async (req, res, next) => {
    const { name, email, password } = req.body;
    const bodySchhema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    });

    const validationResult = bodySchhema.validate(req.body);
    if (validationResult.error) {
        res.statusCode = 400;
        res.send({ message: validationResult.error.details[0].message });
        return;
    }

    try {
        const newUser = new UserModel({
            name,
            email,
            password
        });

        await newUser.save();
        const user = await UserModel.findOne({ email });
        const expire = process.env.JWT_EXPIRATION;
        const token = jwt.sign({ sub: user._id }, user.salt, { expiresIn: expire });
        res.send({ token: token })

    } catch (e) {
        if (e.code === 11000 && e.name === 'MongoError') {
            const error = new Error(`Email address ${newUser.email} is already taken`);
            error.status = 400
            next(error);
        } else {
            next(e);
        }
    }
};

userController.login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const expire = process.env.JWT_EXPIRATION;
    try {
        if (!user) {
            const err = new Error(`No User found with Email ${email}`);
            err.status = 401;
            next(err);
        }

        if (user.password === hashPassword(password, user.salt)) {
            const token = jwt.sign({ sub: user._id }, user.salt, { expiresIn: expire });
            res.send({ token: token })
        } else {
            res.statusCode = 401;
            res.send({ message: 'Password is Wrong!' });
        }
    } catch (e) {
        next(e);
    }
};

userController.profile = (req, res, next) => {
    const user = req.user
    if (!user) {
        res.statusCode = 404;
        res.send({ message: 'User with this ID does not exist!' });
    } else res.send({ user: user })
}

userController.edit = async (req, res) => {
    UserModel.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true }, function (err, result) {
        if (err) {
            res.send({ message: err });
        }
        res.send({ user: result })
    });
}

userController.delete = (req, res) => {
    UserModel.findOneAndDelete({ "_id": req.params.id })
        .then(data => res.json(data))
        .catch(next)
}

module.exports = userController;