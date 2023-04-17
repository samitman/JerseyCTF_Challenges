const express = require('express'); //webapp frameword
const cookieParser = require('cookie-parser'); //cookie middleware

const app = express(); //creates our app object

//set cookie on the server side before using express to render html
app.use(cookieParser());
app.use(function (req, res, next) {
    res.cookie('flag','jctf{I_L0V3_C00KI3S!!!}', { maxAge: 900000, httpOnly: true });
    next(); // <-- important! runs following functions after middleware is complete
});

//Creat endpoint to render HTML
app.use(express.static('public')); //public directory with html and css 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); //path to html
    res.statusCode = 200;
});

//specify port and start the server
app.listen(3001, () => {
    console.log('Server started on http://localhost:3001');
});