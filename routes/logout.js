/**
 * Created by Vasiliy on 25.11.2015.
 */
var express     = require('express');
var jade        = require('jade');
var router      = express.Router();

router.get('/', function (req, res) {
    req.logout();
    res.redirect('/');
});


module.exports = router;