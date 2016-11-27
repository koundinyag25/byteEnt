'use strict';

var _helper = require('./helper.js');

var _webtorrent = require('webtorrent');

var _webtorrent2 = _interopRequireDefault(_webtorrent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = new _webtorrent2.default();

function addInfoHash(req, res) {
    if (typeof req.params.infoHash == 'undefined' || req.params.infoHash == '') {
        res.status(500).send('Missing infoHash parameter!');return;
    }
    var torrent = (0, _helper.buildMagnetURI)(req.params.infoHash);
    try {
        client.add(torrent, function (torrent) {
            var file = (0, _helper.getLargestFile)(torrent);
            res.status(200).send('Added torrent!');
        });
    } catch (err) {
        res.status(500).send('Error: ' + err.toString());
    }
}

function stream(req, res, next) {
    if (typeof req.params.infoHash == 'undefined' || req.params.infoHash == '') {
        res.status(500).send('Missing infoHash parameter!');return;
    }
    var torrent = (0, _helper.buildMagnetURI)(req.params.infoHash);
    try {
        var torrent = client.get(torrent);
        var file = (0, _helper.getLargestFile)(torrent);
        var total = file.length;
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
}

function deleteInfoHash(req, res, next) {
    console.log(req.params);
    if (typeof req.params.infoHash == 'undefined' || req.params.infoHash == '') {
        res.status(500).send('Missing infoHash parameter!');return;
    }
    var torrent = (0, _helper.buildMagnetURI)(req.params.infoHash);
    try {
        var torrent = client.remove(torrent);
        res.send({ status: 200, message: 'torrent removed' });
    } catch (err) {
        res.status(500).send('Error: ' + err.toString());
    }
}

module.exports = {
    addInfoHash: addInfoHash,
    stream: stream,
    deleteInfoHash: deleteInfoHash
};