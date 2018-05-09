let router = require('express').Router();
let path = require('path');
let tripService = require(path.resolve('services/tripService'));

router.get('/', (req, res) => {
    tripService.getTrips((trips) => {
        let response = { data: trips, token: req.newtoken};
        res.send(response);
    });
});

module.exports = router;
