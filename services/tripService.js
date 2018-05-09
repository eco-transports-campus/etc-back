const path = require('path');
const Trip = require(path.resolve('model/trip'));

module.exports = {
    getTrips: (cb) => {
        Trip.find({}, {_id:0, __v:0}).then((trips) => {
            cb(trips);
        });
    },
    // addTrip: (req, res) => {
    //   const newTrip = new Trip(req.body.trip)
    //
    //   newTrip.save((err, saved) => {
    //     if (err) {
    //       res.status(500).send(err)
    //     }
    //     res.json({ trip: saved })
    //   })
    // }
}
