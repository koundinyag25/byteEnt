import express from 'express';
import path from 'path';
import http from 'http';
const app = express();
let port = process.env.PORT || 3000;
import {addInfoHash,stream,deleteInfoHash} from './stream.js';
// Allow Cross-Origin requests
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(path.join(__dirname, '../public')));
app.use('/bower_components',express.static(path.join(__dirname,'../bower_components')));
app.use('/node_modules',express.static(path.join(__dirname,'../node_modules')));
app.use('/trailers',express.static(path.join(__dirname,'../trailers')));
app.use('/previewVid',express.static(path.join(__dirname,'../previewVid')));
app.use('/thumbnails',express.static(path.join(__dirname,'../thumbnails')));
//add,delete and stream torrent.
app.get('/api/add/:infoHash', addInfoHash);
app.get('/stream/:infoHash.mp4', stream);
app.get('/api/delete/:infoHash', deleteInfoHash);

app.listen(port, ()=> {
    console.log('Listening on http://127.0.0.1:' + port);
});
