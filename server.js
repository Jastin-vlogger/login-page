const express = require("express");
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');


const router = require('./route');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

//view engnine
app.set('view engine','ejs');

//path setting
app.use('/static',express.static(path.join(__dirname,'public')) )

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

//middlware
app.use('/',router)

app.listen(port,()=>{
    console.log('server started at http://localhost:5000');
})