const express = require('express');
const ConnectionDatabase = require('./database/db');
const cors = require('cors');
//const Router = require("./routes/routes");
const { RegisterNewUser, LoginUser, Getloggedin } = require('./controller/AuthController');
const Authmiddleware = require('./middleware/AuthMiddleware');

const app = express();

app.use(express.json());
app.use(cors());

//app.use('/', Router)
app.post('/users/register', RegisterNewUser)
app.post('/users/login', LoginUser);
app.get('/users/getloggedin', Authmiddleware, Getloggedin);
// app.get('/posts', GetPost);
// app.post('/posts/update/:id', UpdatePost);
// app.post('/posts/delete/:id', DeletePost);



ConnectionDatabase()
    .then(() => {
        try {
            app.listen(3000, () => {
                console.log("Server is started");
            })
        }
        catch (err) {
            console.log(err.message);
        }


    })
