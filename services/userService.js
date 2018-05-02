const path = require('path');
const User = require(path.resolve('model/user'));
const TokenGenerator = require('uuid-token-generator');

let returnUniqueUser = (users, cb) => {
    if(users.length > 1) {
        // TODO process error
    }
    else if(users.length === 0) {
        cb({});
    }
    else {
        cb(users[0]);
    }
};

let getDBUserByUsername = (username, cb) => {
    User.find({username}).then((users) => {
        cb(users.length > 0 ? users[0] : {});
    })
}

module.exports = {
    getUsers: (cb) => {
        User.find({}, {_id:0, __v:0, token:0, tokenExpiry:0}).then((users) => {
            cb(users);
        });
    },
    getUserByUsername: (username, cb) => {
        console.log("bbb");
        User.find({username}, {_id:0, __v:0, token:0, tokenExpiry:0}).then((users) => {
            returnUniqueUser(users, cb);
        });
    },
    getCompleteUserByUsername: (username, cb) => {
        User.find({username}).then((users) => {
            console.log(users);
            returnUniqueUser(users, cb);
        });
    },
    getUserByToken: (token, cb) => {
        if(token === undefined){
            cb({});
        }
        else {  
            User.find({token}).then((users) => {
                returnUniqueUser(users, cb);
            });
        }
    },
    updateTokenForUser: (user, cb) => {
        getDBUserByUsername(user.username, (dbUser) => {

            console.l

            // token generation
            const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);
            token = tokgen.generate();

            if(dbUser == {}) {
                // new user
                dbUser = new User(user);
            }

            dbUser.token = token;
            dbUser.tokenExpiry = new Date(new Date().getTime() + 30*60000);
            dbUser.save().then( (user) => {
                cb(user);
            });
        });
    }
}