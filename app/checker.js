'use strict'

var http = require('http');
var cheerio = require('cheerio');
var url = require('url');

module.exports = function (req, res) {

    var _url = req.body.url;
    console.log('req.url: ' + _url);
    var url0 = url.parse(_url);

    var options = {
        host: url0.hostname,
        path: url0.path
    }
    var request = http.request(options, function (resx) {

        var respo = [];

        if (resx.statusCode != 200 && resx.statusCode != 302 ){
            respo.push({header:'Error', text:'Page not available, statusCode: ' + resx.statusCode});
            res.send(respo);
            return false;
        }

        var data = '';
        resx.on('data', function (chunk) {
            data += chunk;
        });
        resx.on('end', function () {

            if (data.match(/^<!DOCTYPE html>|^<!doctype html>/)) {
                respo.push({header:'HTML version', text:'5'});
            } else {
                respo.push({header:'HTML version', text:'not 5'});
            }

            var $ = cheerio.load(data);

            var title = $('head title').text();
            respo.push({header:'Title', text:title});

            var h;
            for (var i=1; i<=6; i++) {
                var hcnt = $('h' + i).length;
                if (hcnt > 0) {
                    respo.push({header:'Heading h' + i, text:hcnt});
                }
            }

            var acnt = $('a:not([href^="http"])').length;
            respo.push({header:'Internal links', text:acnt});

            acnt = $('a[href^="http"]').length;
            respo.push({header:'External links', text:acnt});

            respo.push({header: 'Login form', text: ($('form input[type=password]').length > 0 ? "Yes" : "No")});

            res.send(respo);
        });
    });
    request.on('error', function (e) {
        var respo = [];
        respo.push({header:'Error', text:'Page not found'});
        res.send(respo);
    });
    request.end();

}



