const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view-engine', 'hbs');
app.use(express.static(__dirname+'/public'));

//middleware
app.use((req,res,next) => {
   var now = new Date().toString();
   var log = `${now}: ${req.method} ${req.url}`;
   console.log(log);
   fs.appendFile('server.log' , log + '\n',(err) => {
       console.log('Unable to append log in the server.log');
   });
   next();
});

app.use((req,res,next) => {
    res.render('maintenance.hbs',{
       
    });
    
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt' , (text) => {
     return text.toUpperCase();
});
// app.get('/', (req,res) => {
//     res.send('hello express!');
// });

app.get('/', (req,res) => {
    res.render('home.hbs', {
        pageTitle : 'Home Page',
       
        msg : 'Handlebars'
    });
});

app.get('/about',(req,res) => {
    res.render('about.hbs',{
        pageTitle : 'About Page',
        currentYear : new Date().getFullYear()
    });
});
const port = 3000;
app.listen(port, () => {
    console.log("Server started at port: ",port);
});