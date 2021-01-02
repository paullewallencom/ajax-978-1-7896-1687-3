const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./helper/datasim.js');
const data = db.data;

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/users', function (req, res) {
    res.json(data);
})
app.post('/users', function (req, res) {
    req.body.id = Math.floor(Date.now());
    data.users.push(req.body);
    res.send('POST sent')
})
app.get('/users/:id', function (req, res) {
    res.send(db.getRow(req.params.id));
})
app.put('/users/:id', function (req, res) {
    let id = db.findID(data.users,req.params.id);
    if (id != -1) {
        data.users[id] = req.body
        res.write('updated ' + id)
    }
    else {
        res.write('not found');
    }
    res.send();
})
app.delete('/users/:id', function (req, res) {
    let id = db.findID(data.users,req.params.id);
    if (id != -1) {
        data.users.splice(id, 1);
        res.write('deleted ' + req.params.id)
    }
    else {
        res.write('not found');
    }
    res.send()
})
app.listen(3000);