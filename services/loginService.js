const path = require('path');
const userService = require(path.resolve('services/userService'));

module.exports = {
    checkToken : (token, cb) => {

        console.log("toto");
        
        userService.getUserByToken(token, (user) => {
            if(user === {}) {
                cb({ok: false});
            }
            else {
                if(user.tokenExpiry > new Date().getTime()) {
                    // token is valid
                    userService.updateTokenForUser(user, (updatedUser) => {
                        console.log(updatedUser);
                        cb({ok: true, token: updatedUser.token, user: user.username});
                    });
                }
                else {
                    cb({ok: false});
                }
            }
        });
       
    }
}