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
    res.json(data);
})
app.post('/users', function (req, res) {
    req.body.id = data.users.length + 1;
    data.users.push(req.body);
    res.send('POST sent')
})
app.get('/users/:id', function (req, res) {
    res.send(getRow(req.params.id));
})
app.put('/users/:id', function (req, res) {
    console.log(req.body);
    req.body.id = req.params.id;
    let temp = data.users.indexOf(getRow(req.params.id));
    if (temp != -1) {
        data.users[temp] = req.body
        res.write('updated ' + temp)
    }else{
        res.write('not found');
    }
    console.log(data);
    res.send();
})
app.delete('/users/:id', function (req, res) {
    //delete user
    let temp = data.users.indexOf(getRow(req.params.id));
    if (temp != -1) {
        data.users.splice(temp, 1);
        res.write('deleted ' + temp)
    }else{
        res.write('not found');
    }
    console.log(data);
    res.send()
})
app.listen(3000);

function getRow(id) {
    for (let item of data.users) {
        if (item.id == id) return item;
    }
    return false;
}
      