const jwt = require('jsonwebtoken');
const joi = require('joi');
const { hashPassword } = require('../helper');
const UserModel = require('../models/User');

const router = app => {

    // app.get('/', function (req, res) {
    //     res.redirect('/');
    // });

    app.post('/user/register', async (req, res) => {
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

        } catch (error) {
            res.statusCode = 400;
            res.send({ message: error.message });
        }
    });

    app.post('/user/login', async (req, res) => {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const expire = process.env.JWT_EXPIRATION;

        if (!user) {
            res.statusCode = 401;
            res.send({ message: 'No User found' });
        } else {
            if (user.password === hashPassword(password, user.salt)) {
                const token = jwt.sign({ sub: user._id }, user.salt, { expiresIn: expire });
                res.send({ token: token })
                
            } else {
                res.statusCode = 401;
                res.send({ message: 'Password is Wrong!' });
            }
        }
    });

    app.get('/user/profile', checkToken(), async (req, res) => {
        const user = req.user
        if (!user) {
            res.statusCode = 404;
            res.send({ message: 'User with this ID does not exist!' });
        } else res.send({ user: user })
    });

    app.delete('/user/:id', async (req, res) => {

        UserModel.findOneAndDelete({ "_id": req.params.id })
            .then(data => res.json(data))
            .catch(next)
    });

    app.put('/user/', checkToken(), async (req, res) => {
        UserModel.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true }, function (err, result) {
            if (err) {
                res.send({ message: err });
            }
            res.send({ user: result })
        });
    })

    app.get('*', (req, res) => res.send('URL not found!'));
};

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

module.exports = router;