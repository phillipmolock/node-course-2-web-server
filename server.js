const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// set express related conditions key:pair 
app.set('view engine', 'hbs');
// register for partials

hbs.registerPartials(__dirname + '/views/partials');

// Maintenance mode
//app.use((req,res,next) => {
//    res.render('maintenance.hbs');
//});

// express.tatic middleware
app.use(express.static(__dirname + '/public'));

// app.use is how you register express middleware
app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// hbs helpers

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/',(req, res) => {
//res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my node.js webserver home page!'
    });
});

app.get('/about',(req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    }); //second argument can eb argument
});

// route /bad send back json with errorMessage

app.get('/bad',(req, res)=>{
    res.send({
        errorMessage: 'Bad request'
    });
});

app.listen(3000, () =>{
    console.log('Server is up on port 3000');
    console.log(__dirname + '/views/partials');
});