const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const joi = require('joi');
const { hashPassword } = require('../helper');
const UserModel = require('../models/User');

const checkToken = () => {
    return async (req, res, next) => {
        try {
            const token = req.headers.token;
            if (!token) {
                res.statusCode = 401;
                res.send({ message: 'ليس لديك صلاحية' });
                return;
            }

            const decodedToken = jwt.decode(token);
            const user = await UserModel.findById(decodedToken.sub);

            if (!user) {
                res.statusCode = 401;
                res.send({ message: 'ليس لديك صلاحية' });
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

router.post('/register', async (req, res, next) => {
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
            res.send({ message: `عنوان البريد الإلكتروني ${email} مستخدم بالفعل` });
            res.statusCode = 400;
            next();
        } else {
            next(e);
        }
    }
});

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const expire = process.env.JWT_EXPIRATION;
    try {
        if (!user) {
            res.send({ message: `لم يتم العثور على مستخدم بالبريد الإلكتروني ${email}` });
            res.statusCode = 401;
            next();
        }

        if (user.password === hashPassword(password, user.salt)) {
            const token = jwt.sign({ sub: user._id }, user.salt, { expiresIn: expire });
            res.send({ token: token })
        } else {
            res.statusCode = 401;
            res.send({ message: '! كلمة السر خاطئة' });
        }
    } catch (e) {
        next(e);
    }
});

router.get('/profile', checkToken(), (req, res, next) => {
    const user = req.user
    if (!user) {
        res.statusCode = 404;
        res.send({ message: 'لم يتم العثور على المستخدم' });
    } else res.send({ user: user })
});

router.put('/', checkToken(), async (req, res) => {
    UserModel.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true }, function (err, result) {
        if (err) {
            res.send({ message: err });
        }
        res.send({ user: result })
    });
});

router.delete('/:id', (req, res, next) => {
    UserModel.findOneAndDelete({ "_id": req.params.id })
        .then(data => res.json(data))
        .catch(next)
});

router.get('*', (req, res) => res.send('URL not found!'));

module.exports = router;