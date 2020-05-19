'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var db = require("./database.js");
const { check, validationResult } = require('express-validator');

//var routes = require('./routes/add');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(express.urlencoded());
app.use(express.json());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'wwwroot')));

//app.use('/data', routes);

app.get("/index", (req, res, next) => {
    res.redirect('/index.html')
});

app.post('/fruite', [
    check('fruite').isEmail()//,
    //check('password').isLength({ min: 5 })
], (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    req.end('ok\n');
});

app.post("/lid", (req, res, next) => {
    // first_name
    // second_name
    // birth_date
    // phone_number
    // email
    // city
    // is_jewroot 

   
    var errors = []
    if (!req.body.email) {
        errors.push("Email required");
    }
    if (!req.body.first_name) {
        errors.push("First name required");
    }
    if (!req.body.second_name) {
        errors.push("second_name required");
    }
    if (!req.body.city) {
        errors.push("city name required");
    }
    if (!req.body.phone_number) {
        errors.push("phone_number name required");
    }
    if (!req.body.birth_date) {
        errors.push("birth_date name required");
    }
    if (!req.body.is_jewroot) {
        errors.push("is_jewroot name required");
    }
    

    //.....
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }

    var data = {
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password)
    }

    var sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
    var params = [data.name, data.email, data.password]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    });

});

app.get("/email", (req, res, next) => {
    // /email?content=text
    var content = req.query.content;

    try {
        // https://myaccount.google.com/lesssecureapps
        var client = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'denis.skornyakov@gmail.com',
                pass: '12345'
            }
        });

        var email = {
            from: 'denis.skornyakov@gmail.com',
            to: 'dr.fel@mail.ru',
            subject: 'Sending Email using Node.js',
            text: content
        };

        client.sendMail(email, function (error, info) {
            if (error) {
                console.log(error);
                //res.end(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.end('Email sent: ' + info.response);
            }
        });
    }
    catch (error) {
        console.log(error);
        res.end(error);
    }

});

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
    //var err = new Error('Not Found');
    //err.status = 404;
    //next(err);
    res.redirect("/404.html");
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
