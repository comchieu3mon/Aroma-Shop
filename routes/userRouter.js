let express = require("express");
let router = express.Router();
let Sequelize = require('sequelize');
let Op = Sequelize.Op;
let userController = require('../controllers/userController');

router.get('/login', function (req, res) {
    res.render('login');
})

router.get('/register', function (req, res) {
    res.render('register');
})

router.post('/register', function (req, res, next) {
    let fullname = req.body.fullname;
    let email = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    let keepLoggedIn = (req.body.keepLoggedIn != undefined);

    // check pass vs confirm
    if (password != confirmPassword) {
        return res.render('register', {
            message: 'Confirm password does not match',
            type: 'alert-danger'
        });
    }
    // check username chua ton tai
    userController
        .getUserByEmail(email)
        .then(user => {
            if (user) {
                return res.render('register', {
                    message: `${email} exists! Please choose another email`,
                    type: 'alert-danger'
                });
            }
            // tao tai khoan
            user = {
                fullname,
                username: email,
                password: password
            }
            return userController
                .createUser(user)
                .then(user => {
                    if (keepLoggedIn) {
                        req.session.user = user;
                        res.redirect('/');
                    } else {
                        res.render('login', {
                            message: 'You have registered, now please login',
                            type: 'alert-primary'
                        });
                    }
                })
        })
        .catch(error => next(error))
})

router.post('/login', function (req, res) {
    let email = req.body.username;
    let password = req.body.password;
    let keepLoggedIn = req.body.keepLoggedIn;

    userController
        .getUserByEmail(email)
        .then(user => {
            if (user) {
                if (userController.comparePassword(password, user.password)) {
                    req.session.user = user;
                    res.redirect('/');
                } else {
                    res.render('login', {
                        message: 'Incorrect password!',
                        type: 'alert-danger'
                    });
                }
            } else {
                res.render('login', {
                    message: 'Email does not exist!',
                    type: 'alert-danger'
                });
            }
        })
});

router.get('/logout', function (req, res, next) {
    req.session.destroy(error => {
        if (error) {
            return next(error);
        }
        return res.render('login');
    });
})

module.exports = router;