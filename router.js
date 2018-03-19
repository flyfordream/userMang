var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
    res.send('GET handler for /users route.');
});

router.post('/', function(req, res) {
    res.send('POST handler for /users route.');
});

module.exports = router;