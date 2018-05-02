let router = require('express').Router();
let path = require('path'); 

router.use('/api', require(__dirname + '/api'));

router.use('/login', require(__dirname + '/login'));

router.get('**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
});

module.exports = router;