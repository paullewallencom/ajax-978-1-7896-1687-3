const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('testdb', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});
db.serialize(function () {
    db.run("INSERT INTO users (name,pass ) VALUES ('one4','pass4')");
    db.run("INSERT INTO users (name,pass ) VALUES ('one3','pass3')");
    db.run("DELETE FROM users WHERE id = 1");
    db.run("UPDATE users SET name = 'new_value_1', pass = 'new_value_2' WHERE id = 5")
    db.each("SELECT * FROM users", function (err, row) {
        console.log(row.name, row.pass, row.id);
    });
});
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});