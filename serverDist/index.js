'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _stream = require('./stream.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 3000;

// Allow Cross-Origin requests
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(_express2.default.static(_path2.default.join(__dirname, '../public')));
app.use('/bower_components', _express2.default.static(_path2.default.join(__dirname, '../bower_components')));
app.use('/node_modules', _express2.default.static(_path2.default.join(__dirname, '../node_modules')));
app.use('/trailers', _express2.default.static(_path2.default.join(__dirname, '../trailers')));
app.use('/previewVid', _express2.default.static(_path2.default.join(__dirname, '../previewVid')));
app.use('/thumbnails', _express2.default.static(_path2.default.join(__dirname, '../thumbnails')));
//add,delete and stream torrent.
app.get('/api/add/:infoHash', _stream.addInfoHash);
app.get('/stream/:infoHash.mp4', _stream.stream);
app.get('/api/delete/:infoHash', _stream.deleteInfoHash);

app.listen(port, function () {
    console.log('Listening on http://127.0.0.1:' + port);
});