'use strict';

var RaspiCam = require('raspicam');
var Twitter = require('node-twitter');
var Gpio = require('onoff').Gpio;

var config = require('config');
var button = new Gpio(config.PIN, 'in', 'both');
var twitterRestClient = new Twitter.RestClient(config.CONSUMER_KEY, config.CONSUMER_SECRET, config.TOKEN, config.TOKEN_SECRET);

button.watch(function (err, value) {
    if (err) {
        throw err;
    }

    if (value) {
        return takePhoto();
    }
});

var tweet = function(status, path) {
    twitterRestClient.statusesUpdateWithMedia({
        'status': status,
        'media[]': path
    }, function(error, result) {
        if (error) {
            console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
        }

        if (result) {
            console.log(status, path);
        }
    });
};

var getDateString = function(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();

    return '' + year + '-' + (month<=9 ? '0' + month : month) + '-' + (day <= 9 ? '0' + day : day) + ' ' + (h <= 9 ? '0' + h : h) + ':' + (m <= 9 ? '0' + m : m) + ':' + (s <= 9 ? '0' + s : s);
};

var takePhoto = function() {
    var date = new Date();
    var fileName = getDateString(date);
    var file = './photo/' + fileName + '.jpg';

    var camera = new RaspiCam({
        mode: 'photo',
        output: file,
        encoding: 'jpg',
        width: 1280,
        height: 1024,
        timeout: 1000 // take the picture after 1 sec
    });

    camera.on('exit', function( timestamp ){
        tweet(config.STATUS_MESSAGE, file);
    });

    camera.start();
};

