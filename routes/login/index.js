const router = require('express').Router();
const path = require('path');
const User = require(path.resolve('model/user'));
const userService = require(path.resolve('services/userService'));
const loginService = require(path.resolve('services/loginService'));

router.get('/', (req, res) => {
    let frontendToken = req.query.token;
    if(frontendToken == undefined)
    {
        res.status(400);
        res.send();
    }
    else {
        let username = req.session.cas.user;
        userService.getCompleteUserByUsername(username, (user) => {
            if(! user.username){
                // the user does not exist
                user = new User({
                    username,
                    firstname: req.session.cas.attributes.givenName,
                    lastname: req.session.cas.attributes.sn,
                    mail: req.session.cas.attributes.mail
                });
            }

            user.token = frontendToken,
            user.tokenExpiry = new Date(new Date().getTime() + 30*1000)
            user.save().then( (user) => {
                let redirectURL = 'http://localhost:8737/';
                // TODO : put a global URL
                res.redirect(redirectURL);
            });
        });
    }
});

module.exports = router;