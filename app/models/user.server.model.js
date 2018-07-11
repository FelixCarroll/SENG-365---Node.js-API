const db = require('../../config/db.js'),
    util = require('util');



// exports.getAll = function(done){
//     db.get().query("SELECT * FROM users;", function(err, result){
//         if(err) return done(err);
//         return done(result);
//     });
// };

exports.getOne = function(userID, done) {
    db.get().query("select userID, username, location, email from users where userID = ? and active = 1;",userID, function(err, result){
        if(err){return done(err)};
        done(result);
    });
};

exports.online = function(tokenID, done){
    let query = 'SELECT EXISTS(SELECT 1 FROM `tokens` WHERE tokenID = ?) as live LIMIT 1;';
    db.get().query(query, [tokenID], function(err, result){
        if(err) {return done(err)};
        return done(result);
    });
};

exports.getOnlineID = function(tokenID, done){
    db.get().query('SELECT userID FROM tokens WHERE tokenID = ? LIMIT 1;', tokenID, function(err, result){
        if(err) {return done(err)};
        return done(result);
    });
};

exports.alter = function(user, email, loc, pass, id, done) {
    let query = "UPDATE `users` SET `username` = ?, `email` = ?, `location` = ?, `pass` = ? WHERE `users`.`userID` = ? LIMIT 1;";
    db.get().query(query, [user, email, loc, pass, id], function(err, result){
        if(err) {return done(err);}
        return done(result);
    })
};

exports.insert = function(user, email, loc, pass, done){
    let query = "INSERT INTO `users` (`username`, `email`, `location`, `pass`) VALUES (?, ?, ?, ?);";
    db.get().query(query, [user, email, loc, pass], function(err, result) {
        if (err) {return done(err);}
        return done(result);
    });
};

exports.remove = function(id, done) {
    let query = "DELETE FROM `users` WHERE `users`.`userID` = ? LIMIT 1;";
    db.get().query(query, [id], function(err, result){
        if(err) {return done(err);}
        return done(result);
    });
};

exports.signInStatus = function(user, pass, done){
    let query = "SELECT userID, EXISTS(SELECT 1 FROM tokens WHERE tokens.userID = users.userID) AS live FROM users WHERE username = ? AND pass = ? AND active = 1 LIMIT 1;"
    db.get().query(query, [user, pass], function(err, result){
        console.log(util.format(query, user, pass));
       if(err) {return done(err);}
       return done(result);
    });
};

exports.makeXAuth = function(id, user, pass, res, done){
    let query = 'INSERT INTO `tokens`(`userID`, `tokenID`) VALUES (?, ?);';
    db.get().query(query, [id, id], function(err, result){
        if(err){return done(err);}
        return exports.getXAuth(id, function(r3) {
            if (r3.length == 1) {
                res.json(r3[0]);
            } else {
                res.sendStatus(500); // INTERNAL SERVER ERROR, FAIL TO MAKE X-AUTH
            }
        });
    })
};


exports.getXAuth = function(id, done){
    let query = "select userID, tokenID as 'X-Authorization' from tokens where userID = ? Limit 1;";
    db.get().query(query, [id], function(err, result){
        if(err){return done(err);}
        return done(result);
    })
};


exports.removeXAuth = function(xAuth, done) {
    let query = "DELETE FROM `tokens` WHERE tokenID = ? LIMIT 1;";
    db.get().query(query, [xAuth], function(err, result){
        if(err){return done(err);}
        return done(result);
    })
};


exports.setInActive = function(userID, done) {
    let query = "UPDATE users set active = false where userID = ?;";
    db.get().query(query, [userID], function(err, result){
        if(err){return done(err);}
        return done(result);
    })
};

