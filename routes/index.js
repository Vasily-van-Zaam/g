var express = require('express');
var router = express.Router();
var config = require('nconf');
var User = require('../plugins/users/db');


var gText = require('../language')();
var mainTemplate = config.get('mainTemplate');//'templates/content/main/index';



/* GET home page. */ //EXAMPLE/////
router.get('/', function(req, res, next) {

    var text = gText.language('ru'); // The language - 'en' (ru', 'de' other) taken from SESSION

    res.render(mainTemplate, {
        title: 'Hello',
        login: {on: true},
        textMain: text.main(),
        config: config,
        req: req
    });
});

module.exports = router;

