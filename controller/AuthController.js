const Auth = require('../database/Auth');
const jwt = require('jsonwebtoken')

function generatetoken(user) {
    const { _id, name, email } = user

    let secret = 'fdfdddfd556-4544545';
    return jwt.sign({
        _id, name, email
    }, secret)
}


async function RegisterNewUser(req, res) {
    try {
        console.log("Deny");
        let user = req.body
        const { name, email, gender, password } = user;
        let search = await Auth.findOne({ email: email });
        if (search) {
            return res.status(404).send({
                message: "user with this email already exists"
            })
        } else {
            await Auth.create({ name: name, email: email, gender: gender, password: password })
            return res.send({
                message: "Successfully registered"
            })
        }
    }
    catch (err) {
        return res.status(500).send({
            message: err.message
        })
    }
}

async function LoginUser(req, res) {
    try {
        let data = req.body;
        const { email, password } = data;
        let search = await Auth.findOne({ email: email });
        if (!search) {
            return res.status(404).send({
                message: "user with thise email not exi"
            })
        }
        if (search.password !== data.password) {
            return res.status(404).send({
                message: "Wrong password"
            })
        }
        let token = generatetoken(search);
        console.log(token);
        if (token) {
            const { _id, name, email } = search
            return res.send({
                message: "login successful",
                data: {
                    token: token,
                    user: {
                        _id, name
                    }
                }
            })
        }
    }

    catch (err) {
        return res.status(500).send({
            message: err.message
        })
    }
}

async function Getloggedin(req, res) {
    try {
        let data = req.user;
        return res.send(data);
    }
    catch (err) {
        return res.status(500).send({
            message: err.message
        })
    }
}



module.exports = {
    RegisterNewUser,
    LoginUser,
    Getloggedin
}
