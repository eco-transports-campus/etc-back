const path = require('path');
const Trip = require(path.resolve('model/trip'));

module.exports = {
    getTrips: (cb) => {
        User.find({}, {_id:0, __v:0}).then((trips) => {
            cb(trips);
        });
    }
}
