const path = require('path');
const Trip = require(path.resolve('model/trip'));

module.exports = {
    getTrips: (cb) => {
        Trip.find({}, {_id:0, __v:0}).then((trips) => {
            cb(trips);
        });
    },
    addTrip: (trip) => {
      const newTrip = new Trip(trip)

      newTrip.save((err, saved) => {
        if (err) {
          res.status(500).send(err)
        }
        return saved
      })
    }
}
