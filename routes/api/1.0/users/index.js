let router = require('express').Router();
let path = require('path');
let userService = require(path.resolve('services/userService'));

router.get('/', (req, res) => {
    userService.getUsers((users) => {
        let response = { data: users, token: req.newtoken};
        res.send(response);
    });
});

module.exports = router;