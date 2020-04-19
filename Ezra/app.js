'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
//var db = require("./database.js");

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'wwwroot')));


//app.get("/", (req, res, next) => {
//    res.redirect('/index.html')
//});

app.get("/index", (req, res, next) => {
    res.redirect('/index.html')
});

//app.get("/email", (req, res, next) => {
//    var content = req.query.content;

//    try {
//        // https://myaccount.google.com/lesssecureapps
//        var transporter = nodemailer.createTransport({
//            service: 'gmail',
//            host: 'smtp.gmail.com',
//            port: 587,
//            secure: false,
//            requireTLS: true,
//            auth: {
//                user: 'denis.skornyakov@gmail.com',
//                pass: '12345'
//            }
//        });

//        var mailOptions = {
//            from: 'denis.skornyakov@gmail.com',
//            to: 'dr.fel@mail.ru',
//            subject: 'Sending Email using Node.js',
//            text: content
//        };

//        transporter.sendMail(mailOptions, function (error, info) {
//            if (error) {
//                console.log(error);
//            } else {
//                console.log('Email sent: ' + info.response);
//            }
//        });
//        res.end(content);
//    }
//    catch (error) {
//        console.log(error);
//        res.end(error);
//    }
//});

//app.get("/api/users", (req, res, next) => {
//    var sql = "select * from user"
//    var params = []
//    db.all(sql, params, (err, rows) => {
//        if (err) {
//            res.status(400).json({ "error": err.message });
//            return;
//        }
//        res.json({
//            "message": "success",
//            "data": rows
//        })
//    });
//});

//app.get("/api/user/:id", (req, res, next) => {
//    var sql = "select * from user where id = ?"
//    var params = [req.params.id]
//    db.get(sql, params, (err, row) => {
//        if (err) {
//            res.status(400).json({ "error": err.message });
//            return;
//        }
//        res.json({
//            "message": "success",
//            "data": row
//        })
//    });
//});

//app.post("/api/user/", (req, res, next) => {
//    var errors = []
//    if (!req.body.password) {
//        errors.push("No password specified");
//    }
//    if (!req.body.email) {
//        errors.push("No email specified");
//    }
//    if (errors.length) {
//        res.status(400).json({ "error": errors.join(",") });
//        return;
//    }
//    var data = {
//        name: req.body.name,
//        email: req.body.email,
//        password: md5(req.body.password)
//    }
//    var sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
//    var params = [data.name, data.email, data.password]
//    db.run(sql, params, function (err, result) {
//        if (err) {
//            res.status(400).json({ "error": err.message })
//            return;
//        }
//        res.json({
//            "message": "success",
//            "data": data,
//            "id": this.lastID
//        })
//    });
//})



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
