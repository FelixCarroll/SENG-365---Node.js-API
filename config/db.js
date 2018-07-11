const mysql = require ('mysql'),
    fs = require("fs");
const state = {
    pool : null
};

exports.senddata = function () {
    return list;
}

list = [];



add = function (data) {
    list.push(data);
};


exports.connect = function(done) {
    state.pool = mysql.createPool({
        host: process.env.SENG365_MYSQL_HOST || 'localhost',
        port: process.env.SENG365_MYSQL_PORT || 6033,
        user: 'root',
        password: 'secret',
        database: 'mysql',
        multipleStatements: true,
    });

    exports.load(function (err, data) {
        if(err == []) {
            done(err);
        } else {
            testConnection(data, function (err) {
                if(err){
                    return done(err)
                }
            });
        }
    });

    state.pool = mysql.createPool({
        connectionLimit: 100,
        host: process.env.SENG365_MYSQL_HOST || 'localhost',
        port: process.env.SENG365_MYSQL_PORT || 6033,
        user: 'root',
        password: 'secret',
        database: 'assignment',
        multipleStatements: true,
    });
    done ();
};

exports.get = function() {
    return state.pool;
};

let testConnection = function (data, done) {
    setTimeout(function () {
        add("hello")
        state.pool.getConnection(function (err, connection) {
            //console.log(err, connection)
                if (err) {
                    add(err)
                    testConnection(data, done);
                } else {

                    connection.query(data.toString(), function (err, result) {
                        if(err){
                            add(err)
                            return done(err)
                        } else {
                            add("database created")

                        }
                    });
                }
            }
        );
    }, 3000);
    done ();
}

exports.load = function(done){
    fs.readFile("./config/database.sql", function (err, data) {
        //add(data)
        if(err){
            return done(err, []);
        } else {
            done([], data)
        }
    })
}
