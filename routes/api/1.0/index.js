const router = require('express').Router();
const path = require('path'); 
const loginService = require(path.resolve('services/loginService'));

router.get('*', (req, res, next) => {
    loginService.checkToken(req.query.token, (data) => {
        if(data.ok == false) {
            res.status(401);
            res.send();
        }
        else {
            req.newtoken = data.token;
            console.log("token: " + req.newtoken);
            req.user = data.user;
            next();
        }
    });
});

router.use('/users', require(__dirname + '/users'));
router.use('/login', require(__dirname + '/login'));

router.get('*', (req, res) => {
    res.send('Ok - API v1');
});

module.exports = router;