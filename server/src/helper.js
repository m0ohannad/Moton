const crypto = require('crypto');

const hashPassword = (Password, salt = process.env.JWT_SECRET) => {
    return crypto.createHmac('sha256', salt).update(Password).digest('hex');
}

exports.hashPassword = hashPassword;