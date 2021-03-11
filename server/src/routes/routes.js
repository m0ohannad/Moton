const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const joi = require('joi');
const UserModel = require('../models/User');

const userController = require('../controllers/controller');

const checkToken = () => {
    return async (req, res, next) => {
        try {
            const token = req.headers.token;
            if (!token) {
                res.statusCode = 401;
                res.send({ message: 'You have no permissions!' });
                return;
            }

            const decodedToken = jwt.decode(token);
            const user = await UserModel.findById(decodedToken.sub);

            if (!user) {
                res.statusCode = 401;
                res.send({ message: 'You have no permissions!' });
                return;
            }
            req.user = user
            jwt.verify(token, user.salt)

        } catch (error) {
            res.statusCode = 401;
            res.send({ message: error.message });
            return;
        }
        next();
    };
};

router.post('/register', function (req, res, next) {
    userController.regisetr
});

router.post('/login', function (req, res, next) {
    userController.login
});

router.get('/profile', function (req, res, next) {
    userController.profile
});

router.put('/', checkToken(), function (req, res) {
    userController.edit
});

router.delete('/:id', checkToken(), function (req, res) {
    userController.delete
});

router.get('*', (req, res) => res.send('URL not found!MMM Mohannad'));


module.exports = router;