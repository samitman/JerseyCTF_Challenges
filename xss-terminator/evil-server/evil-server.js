var express = require('express');
var app = express();

app.use(function(req, res, next) {
	// Allows CORS requests:
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

var flag = "";
var stolenCookie = "";

app.get('/cookie', function(req, res, next) {
	//console.log('GET /cookie');
	//console.log(req.query.data);
	if(req.query.data.includes("connect.sid") && req.query.data.length>50){
		stolenCookie = req.query.data;
		flag = "jctf{who_said_you_could_open_the_cookie_jar!?}";
	} else {
		console.log("try again!");
	}
	res.send('Thanks!');
});

app.get('/', function(req, res, next) {
	if(flag.length>1 && stolenCookie.length>1){
		res.send(`<html><head><title>Evil Server</title>
		<style>body {background-color:#282828; color:gainsboro; padding-top:30px; margin-left:30px;}</style>
		<script type="text/javascript">
  		setTimeout(function () { location.reload(true); }, 5000);
		</script></head>
		<p>You stole the cookie!</p><p>Flag: ${flag}</p>
		<p>This message will self destruct in 5 seconds.</p>
		<html>`);
		setTimeout(function() {
			flag = "";
			stolenCookie = "";
		}, 10000);
	} else {
		res.send(`<html><head><title>Evil Server</title>
		<style>body {background-color:#282828; color:gainsboro; padding-top:30px; margin-left:30px;}</style></head>
		<p>Steal the cookie and send it to my /cookie?data endpoint </p> 
		<p>Once you do, refresh the page to find the flag ;)</p>`);
	}
});

app.listen(3001, function() {
	console.log('"Evil" server listening at localhost:3001');
});
