let router = require('express').Router();
let path = require('path'); 

router.use('/1.0', require(__dirname + '/1.0'));

router.get('**', (req, res, next) => {
    res.status(404);
    res.sendFile(path.resolve('public/404.html'));
});

module.exports = router;