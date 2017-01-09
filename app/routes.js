'use strict';

var Checker = require('./checker');

module.exports = function(app) {

	// api ---------------------------------------------------------------------
    app.post('/api/checkurl', function(req, res) {
        Checker(req, res);
    });

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
};