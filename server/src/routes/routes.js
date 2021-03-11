const router = express.Router();
const jwt = require('jsonwebtoken');
const joi = require('joi');
const UserModel = require('../models/User');

const userController = require('../controllers/controller');

router.post('/register', userController.regisetr);
router.post('/login', userController.login);
router.get('/profile', userController.profile);
router.put('/', checkToken(), userController.edit);
router.delete('/:id', checkToken(), userController.delete);
app.get('*', (req, res) => res.send('URL not found!MMM Mohannad'));

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