/**
 * Created by Vasiliy on 25.11.2015.
 */
var express = require('express');
var jade        = require('jade');
var router = express.Router();

var config = require('nconf');

var passport = require('../plugins/users/authentication');

var mainTemplate = config.get('mainTemplate');
var formAuthTemplate = 'plugins/users/auth';

var gText = require('../language')();



router.get('/', function (req, res) {

    /*var formAuth = jade.render(formAuthTemplate, {
        error: req.flash('error')
    });*/

    var textMain = gText.language('en').main(); // The language - 'en' (ru', 'de' other) taken from SESSION
    var errorMessage = req.flash('error')[0];

    if (req.isAuthenticated()) {
        res.redirect('/');
        return;
    }

    console.log(textMain('errorLogin'));
    res.render(formAuthTemplate, {
        error: textMain(errorMessage)
    });
});


router.post('/', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth',
        failureFlash: true })
);




module.exports =  router;