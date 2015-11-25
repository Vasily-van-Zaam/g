/**
 * Created by Vasiliy on 18.11.2015.
 *
 * plugind users db.js
 */

var mongoose = require('mongoose');
var db = require('../../db');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {type: String,  trim: true, lowercase: true, required: true, unique: true},
    password: {type: String, required: true},

    data: Schema.Types.Mixed,
    date: Date
});

var GameStartSchema = new Schema({

});





var User = db.model("users", UserSchema);
module.exports = User;