var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + 'www'));
app.get('/api/v1/user/verifyMobile/:mobileNumber', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res
        .status(200)
        .end(JSON.stringify({ code: 200, status: true, isExistingUser: true }));
});
app.get('/:id', (req, res) => {
    res.end('Displaying id ', req)
})
app.post('/api/v1/user/validateUser', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    if (req.body.userName === 'username' && req.body.password === 'password') {
        res
            .status(200)
            .end(JSON.stringify({ code: 200, status: 'success', message: 'User logged in SuccessFully' }));
    } else {
        res
            .status(200)
            .end(JSON.stringify({ code: 400, status: 'fail', message: 'Invalid Username and Password.' }));
    }

})

app.post('/api/v1/task', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    res
        .status(200)
        .end(JSON.stringify({ status: 200, message: "Success", data: 'projects' }));

})
// var server = app.listen(9999, '127.0.0.1', function () {
//     console.log(`Test server is ready on  http://${server.address().address}:${server.address().port}`);
// });
app.listen(8080);