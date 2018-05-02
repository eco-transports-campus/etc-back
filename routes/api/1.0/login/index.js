const router = require('express').Router();
const path = require('path');
const loginService = require(path.resolve('services/loginService'));
const userService = require(path.resolve('services/userService'));

router.get('/', (req, res) => {
    userService.getUserByUsername(req.user, (user) => {
        console.log(user);
        let response = { data: user, token: req.newtoken};
        res.send(response);
    })

});

module.exports = router;