let router = require('express').Router();
let path = require('path');
let tripService = require(path.resolve('services/tripService'));
const Trip = require(path.resolve('model/trip'));

router.get('/', (req, res) => {
    tripService.getTrips((trips) => {
        let response = { data: trips, token: req.newtoken};
        res.send(response);
    });
});

router.post('/', (req, res) => {
  console.log(req.body)
  const newTrip = new Trip(req.body.trip)

  newTrip.save((err, saved) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json({ trip: saved })
  })
});

module.exports = router;
