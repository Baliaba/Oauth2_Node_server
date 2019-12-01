/********
 * user.js file (models)
 ********/

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var User = new Schema({
    client_id: {
        type: String,
        required : [ true, 'client_id is required'],
        lowercase : true
    },
    client_secret: {
        type: String,
        required : [ true, 'client_secret is required'],
        unique : true,
        lowercase : true
    },
    scope: {
        type: String,
        required : [ true, 'scope is required'],
        unique : true,
        lowercase : true
    },
    grant_type: {
        type: String,
        required : [ true, 'grant_type is required'],
        unique : true,
        lowercase : true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User);