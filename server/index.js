var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
require('./config/db');
const morganBody = require('morgan-body');
const passport = require("passport");
require('./config/passport')(passport)
const KEYS = require("./config/keys");

morganBody(app, { logReqUserAgent: false, timezone: false });
app.use(bodyParser.json())
app.use(passport.initialize());


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'),
        res.setHeader('Access-Control-Allow-Credentials', 'true'),
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE'),
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'),
        res.setHeader('Cache-Control', 'no-cache'),
        next()
})

app.use("/user", require('./routes/User.js'));
app.use("/data", require('./routes/Data.js'));
app.use("/chart", require('./routes/Chart.js'));

// error handling middleware
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(422).send(err);
})
app.listen(4001),
    console.log('Server is listening on port number 4001 ... ')

