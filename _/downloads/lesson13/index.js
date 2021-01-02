const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const data = {
    "users": [{
        "user": "admin"
        , "pass": "password"
        , "id": 1
}, {
        "user": "admin1"
        , "pass": "password2"
        , "id": 2
}]
};
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.get('/users', function (req, res) {
    //see all users
    res.send('GET sent')
})
app.post('/users', function (req, res) {
    //create add user
    
    req.body.id = data.users.length+1;
    data.users.push(req.body);
    console.log(req.body);
    console.log(data);
    res.send('POST sent')
})
app.get('/users/:id', function (req, res) {
    //get user info by id
    console.log(req.params);
    res.send('user by ID');
})
app.put('/users/:id', function (req, res) {
    //update user
    console.log(req.params);
    res.send('PUT sent ' + req.params.id)
})
app.delete('/users/:id', function (req, res) {
    //delete user
    console.log(req.params);
    res.send('DELETE sent')
})
app.listen(3000)