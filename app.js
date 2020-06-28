// express is the server that forms part of the nodejs program
var express = require('express');
var path = require("path");
var fs = require('fs');
var app = express();

// add an https server to serve files 
var https = require('https');

var privateKey = fs.readFileSync('/home/studentuser/certs/cert.key').toString();
var certificate = fs.readFileSync('/home/studentuser/certs/cert.crt').toString();

var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials, app);

httpsServer.listen(4443);


app.get('/', function (req, res) {
    res.send("Hello World from the HTTPS Server");
});

// adding functionality to log the requests
app.use(function (req, res, next) {
    var filename = path.basename(req.url);
    var extension = path.extname(filename);
    console.log("The file " + filename + " was requested.");
    next();
});

app.use(express.static(__dirname));