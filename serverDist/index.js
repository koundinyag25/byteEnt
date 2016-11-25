'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _webtorrent = require('webtorrent');

var _webtorrent2 = _interopRequireDefault(_webtorrent);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 3000;

var client = new _webtorrent2.default();

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

var getLargestFile = function getLargestFile(torrent) {
    var file;
    for (var i = 0; i < torrent.files.length; i++) {
        if (!file || file.length < torrent.files[i].length) {
            file = torrent.files[i];
        }
    }
    return file;
};

var buildMagnetURI = function buildMagnetURI(infoHash) {
    return 'magnet:?xt=urn:btih:' + infoHash + '&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969';
};

app.get('/api/add/:infoHash', function (req, res) {
    if (typeof req.params.infoHash == 'undefined' || req.params.infoHash == '') {
        res.status(500).send('Missing infoHash parameter!');return;
    }
    var torrent = buildMagnetURI(req.params.infoHash);
    try {
        client.add(torrent, function (torrent) {
            var file = getLargestFile(torrent);
            // torrent.on('upload', function() {
            //     if(torrent.length == torrent.downloaded) {
            //         torrent.destroy();
            //         torrent.discovery.stop(torrent);
            //     }
            // });
            res.status(200).send('Added torrent!');
        });
    } catch (err) {
        res.status(500).send('Error: ' + err.toString());
    }
});

app.get('/stream/:infoHash.mp4', function (req, res, next) {
    if (typeof req.params.infoHash == 'undefined' || req.params.infoHash == '') {
        res.status(500).send('Missing infoHash parameter!');return;
    }
    var torrent = buildMagnetURI(req.params.infoHash);
    try {
        var torrent = client.get(torrent);
        var file = getLargestFile(torrent);
        var total = file.length;
        console.log('total', total);
        if (typeof req.headers.range != 'undefined') {
            var range = req.headers.range;
            var parts = range.replace(/bytes=/, "").split("-");
            var partialstart = parts[0];
            var partialend = parts[1];
            var start = parseInt(partialstart, 10);
            var end = partialend ? parseInt(partialend, 10) : total - 1;
            var chunksize = end - start + 1;
            console.log('start and end', chunksize);
        } else {
            var start = 0;var end = total;
        }
        console.log('you ass', file.name);
        var stream = file.createReadStream({ start: start, end: end });
        res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': '' });
        stream.pipe(res);
    } catch (err) {
        res.status(500).send('Error: ' + err.toString());
    }
});

// app.get('/api/delete/:infoHash', function(req, res, next) {
//     if(typeof req.params.infoHash == 'undefined' || req.params.infoHash == '') {
//         res.status(500).send('Missing infoHash parameter!'); return;
//     }
//     var torrent = buildMagnetURI(req.params.infoHash);
//     try {
//         var torrent = client.remove(torrent);
//         res.status(200).send('Removed torrent. ');
//     } catch (err) {
//         res.status(500).send('Error: ' + err.toString());
//     }
// });

app.listen(port, function () {
    console.log('Listening on http://127.0.0.1:' + port);
});