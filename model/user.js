module.exports = Mongoose.model('User', {
    'username': String,
    'firstname': String,
    'lastname': String,
    'token': String,
    'tokenExpiry': Date
});