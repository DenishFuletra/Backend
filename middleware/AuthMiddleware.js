const jwt = require('jsonwebtoken');
const Auth = require("../database/Auth");

async function Authmiddleware(req, res, next) {
    const authorization = req.headers['authorization'];
    try {
        if (authorization) {
            const token = authorization.split(' ').pop();
            if (token) {
                let secret = 'fdfdddfd556-4544545';
                try {
                    jwt.verify(token, secret);
                }
                catch (err) {
                    return res.status(500).send({
                        message: err.message
                    })
                }
                let user = jwt.decode(token);

                let Newuser = await Auth.findById(user._id);

                const { _id, name, email } = Newuser;
                req.user = { _id, name, email }
                next();
            }
            else {
                return res.status(401).send({
                    message: "no token provided"
                })
            }
        } else {
            return res.status(401).send({
                message: 'User is not logged in'
            })
        }
    }
    catch (err) {
        return res.status(500).send({
            message: err.message
        })
    }
}

module.exports = Authmiddleware;