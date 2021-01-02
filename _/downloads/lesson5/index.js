const http = require('http');
const fs = require('fs');


const site = http.createServer(function (req, res) {
    fs.readFile('test.json',function(error,data){
        let holder = JSON.parse(data);
        res.setHeader('Content-Type', 'application/json');
        res.write(data);
        console.log(holder.firstName + ' ' + holder.lastName);
        res.end();
    })
});
site.listen(3000);