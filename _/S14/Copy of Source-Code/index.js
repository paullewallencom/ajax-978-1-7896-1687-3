const express = require('express')
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const twit = require('twit');
const T = new twit({
    consumer_key: '***'
    , consumer_secret: '***'
    , access_token: '***'
    , access_token_secret: '***'
    , timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests. 
})
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.get('/tweets/:search', function (req, res) {
    T.get('search/tweets', {
        q: req.params.search
        , count: 5
    }, function (err, data, response) {
        res.json(data);
    })
})
app.post('/comment/', function (req, res) {
    console.log(req.body.comment);
    T.post('statuses/update', {
        status: req.body.comment
    }, function (err, data, response) {
        res.json(data)
    })
})
app.listen(3000)
