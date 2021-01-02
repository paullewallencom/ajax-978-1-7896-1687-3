const data = {
    "users": [{
        "user": "admin"
        , "pass": "password"
        , "id":  1522031701646
}, {
        "user": "admin1"
        , "pass": "password2"
        , "id":  1522031701146
}]
};

function getRow(id) {
    for (let item of data.users) {
        if (item.id == id) return item;
    }
    return false;
}

const findID = function(users,id){
    return users.indexOf(getRow(id))
}

exports.findID = findID;
exports.data = data;
exports.getRow = getRow;