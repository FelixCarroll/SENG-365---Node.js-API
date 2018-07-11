const db = require('../../config/db.js'),
    util = require('util');




exports.getAll = function(start, index, done){
    let str = "LIMIT " + start.toString() + ", " + index.toString();
    if(index == 0){
        db.get().query("SELECT `projectID`, `title`, `subtitle`, `imageURI` FROM `projects` WHERE 1;", function(err, result){
            if(err) return done(err);
            return done(result);
        });
    } else {
        db.get().query("SELECT `projectID`, `title`, `subtitle`, `imageURI` FROM `projects` WHERE 1 ?;", [str], function(err, result){
            if(err) return done(err);
            return done(result);
        });
    }

};

exports.getOne = function(proID, done) {
    db.get().query("select * from projects where projectID = ?;", [proID], function(err, result){
        if(err){return done(err)};
        done(result);
    });
};

exports.online = function(tokenID, done){
    db.get().query('SELECT EXISTS(SELECT 1 FROM tokens WHERE tokenID = ?) as live LIMIT 1;', [tokenID], function(err, result){
        if(err) {return done(err)};
        return done(result);
    });
};

exports.getOnlineID = function(tokenID, done){
    let query = 'SELECT userID FROM tokens WHERE tokenID = ? LIMIT 1;';
    db.get().query(query, [tokenID], function(err, result){
        if(err) {return done(err)};
        return done(result);
    });
};


exports.insert = function(title, subtitle, desc, target, done){
    let query = "INSERT INTO `projects` (`title`, `subtitle`, `desciption`, `imageURI`, `target`, `creationDate`) VALUES (?, ?, ?, 'NA', ?, CURDATE());";
    db.get().query(query, [title, subtitle, desc,  target], function(err, result) {
        if (err) {return done(err);}
        return done(result);
    });
};

exports.getUserID = function(username, done) {
    let query = 'select userID from users where username = ?  and active = 1 LIMIT 1;'
    db.get().query(query, [username], function(err, result){
        if(err){return done(err)};
        done(result);
    });
};

exports.addCreator = function(proID, userID, done){
    let query = "INSERT INTO `creators` (`projectID`, `userID`) VALUES (?, ?);";
    db.get().query(query, [proID, userID], function(err, result) {
        if (err) {return done(err);}
        return done(result);
    });
};

exports.addRewards = function(proID, amount, desc, done){
    let query = 'INSERT INTO `rewards` (`projectID`, `amount`, `description`) VALUES (?, ?, ?);';
    db.get().query(query, [proID, amount, desc], function(err, result) {
        if (err) {return done(err);}
        return done(result);
    });
};

exports.clearRewards = function(proID, done){
    let query = 'DELETE from rewards where projectID = ?;';
    db.get().query(query, [proID], function(err, result) {
        if (err) {return done(err);}
        return done(result);
    });
};

exports.getCreators = function(proID, done) {
    let query = 'SELECT creators.userID, username FROM users join creators on users.userID = creators.userID where creators.projectID = ?;';
    db.get().query(query, [proID], function(err, result) {
        if (err) {return done(err);}
        return done(result);
    });
};

exports.isCreator = function(proID, userID, done) {
    let query = 'SELECT EXISTS(select 1 from creators where userID = ? and projectID = ?) as creator;';
    db.get().query(query, [userID, proID], function(err, result) {
        if (err) {return done(err);}
        return done(result);
    });
};


exports.isProject = function(proID, done) {
    let query = 'SELECT EXISTS(select 1 from projects where projectID = ?) as project;';
    db.get().query(query, [proID], function(err, result) {
        if (err) {return done(err);}
        return done(result);
    });
};

exports.setImage = function(proID, done) {
    let query = 'update projects set `imageURI` = "projects/?/Image" where projectID = ?;';
    db.get().query(query, [proID, proID], function(err, result) {
        if (err) {return done(err);}
        return done(result);
    });
};

exports.getRewards = function(proID, done) {
    let query = 'SELECT rewardID, amount, description FROM rewards where projectID = ?;';
    db.get().query(query, [proID], function(err, result) {
        if (err) {return done(err);}
        return done(result);
    });
};

exports.getProgress = function(proID, done) {
    let query = 'SELECT sum(amount) as total, count(userID) as tally FROM pledges where projectID = ?;';
    db.get().query(query, [proID], function(err, result) {
        if (err) {return done(err);}
        return done(result);
    });
};

exports.getBackers = function(proID, done) {
    let query = 'SELECT IF(pledges.anon, "anonymous", users.username) as name, pledges.amount from pledges join users on pledges.userID = users.userID where projectID = ?;';
    db.get().query(query, [proID], function(err, result) {
        if (err) {return done(err);}
        return done(result);
    });
};

exports.alterProject = function(proID, userID, done){
    let query = 'SELECT EXISTS(SELECT 1 FROM creators WHERE userID = ? AND projectID = ?) as canEdit;';
    db.get().query(query, [userID, proID], function(err, result) {
        if (err) {return done(err);}
        return done(result);
    });
};

exports.setOpen = function(proID, value, done){
    let query = 'UPDATE projects SET open = ? WHERE projectID = ?;';
    db.get().query(query, [value, proID], function(err, result) {
        if (err) {return done(err);}
        return done(result);
    });
};


exports.insertPledge = function (proID, userID, amount, anon, done) {
    let query = 'INSERT INTO `pledges` (`projectID`, `userID`, `amount`, `anon`) VALUES (?, ?, ?, ?); ';
    db.get().query(query, [proID, userID, amount, anon], function(err, result) {
        if (err) {return done(err);}
        return done(result);
    });
};



