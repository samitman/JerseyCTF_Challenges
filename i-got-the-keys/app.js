const express = require('express'); //webapp framework
const app = express();

//Creat endpoint to render HTML
app.use(express.static('public')); //public directory with html and css 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); //path to html
    res.statusCode = 200;
});

//makes sure the authorization header is correct
function checkAuth(req) {

    const authHeader = req.headers.authorization_key;
    if(!authHeader){
        return res.status(401).json({error: 'Authorization header missing'});
    }

    const key = authHeader;
    if(key==='GdERHpBh3x'){ //embedded key
        return true;
    } else {
        return false;
    }
}

app.get('/test', (req, res) => {
 
    if(checkAuth(req)){ //checks for presence of a correct authorization header
        res.status(200).send({
            test: 'Success!'
        })
    } else {
        res.status(401).send({
            Unauthorized: 'Invalid Key!'
        })
    }
});

app.get('/flag', (req, res) => {

    if(checkAuth(req)){
        res.status(200).send({
            flag: 'jctf{*MAJ0R-K3Y-AL3RT*}'
        })
    } else {
        res.status(401).send({
            Unauthorized: 'Invalid Key!'
        })
    }
});

//specify port and start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
