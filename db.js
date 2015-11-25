/**
 * Created by Vasiliy on 18.11.2015.
 */

var mongoose = require('mongoose');
var config = require('nconf');

var confDb = config.get('db');


var paramsConnectDb = 'mongodb://' + confDb.host + ':' + confDb.port + '/' + confDb.name + "";


//Conntect DataBase
var db = mongoose.createConnection(paramsConnectDb);

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function callback () {
    console.log("Connected!")
});


module.exports = db;