const User = require('../models/user.server.model'),
    validate = require("json-validation"),
    UserSchemas = require("../schemas/user.schema.js");

exports.create  = function(req, res) { // INSERT NEW USER
    const schema = UserSchemas.user;
    let jv = new validate.JSONValidation();
    let isValid = jv.validate(req, schema);
    console.log(isValid.ok, isValid.errors);
    if (isValid.ok) {
        let name = req.body.user.username;
        let loc = req.body.user.location;
        let email = req.body.user.email;
        let pass = req.body.password;
        User.insert(name, email, loc, pass, function(r1){
            if(r1.affectedRows == 1){
                res.sendStatus(201); //SUCCESS
            } else {
                res.sendStatus(400); // MALFORMED
            }
        });
    } else {
        res.sendStatus(400); // MALFORMED
    }
};

// exports.list = function(req, res){ // TEMP - DISPLAY ALL USERS INFO
//   User.getAll(function(result){
//       res.json(result);
//   });
// };

exports.read  = function(req, res) { // GET SINGLE USER INFO
    if(req.params.hasOwnProperty("userID") && typeof req.params.userID !== 'undefined' && !isNaN(req.params.userID)){
        let id = req.params.userID;
        User.getOne(id, function(result){
            if(result.length == 1){
                res.json(result[0]); // SUCCESS
            } else {
                res.sendStatus(404); // USER NOT FOUND
            }
        })
    } else {
        res.sendStatus(400); // MALFORMED
    }
};

exports.update  = function(req, res) {
    const schema = UserSchemas.update;
    let jv = new validate.JSONValidation();
    let isValid = jv.validate(req, schema);
    if (isValid.ok && !isNaN(req.params.userID)) {
        let id = req.params.userID;
        let xAuth = req.get("X-Authorization");
        let name = req.body.user.username;
        let loc = req.body.user.location;
        let email = req.body.user.email;
        let pass = req.body.password;
        User.getOnlineID(xAuth, function (r1) {
            if (r1.length == 1) {
                if (r1[0].userID == id) {
                    User.alter(name, email, loc, pass, id, function(r2){
                        if(r2.affectedRows == 1){
                            res.sendStatus(201); //SUCCESS
                        } else {
                            res.sendStatus(404); // USER NOT FOUND
                        }
                    });
                } else {
                    res.sendStatus(403); // FORBIDDEN
                }
            } else {
                res.sendStatus(401); // UNAUTHORISED
            }
        });
    } else {
        res.sendStatus(400); // MALFORMED
    }
};

exports.delete  = function(req, res) {
    const schema = UserSchemas.onlineUser;
    let jv = new validate.JSONValidation();
    let isValid = jv.validate(req, schema);
    if (isValid.ok && !isNaN(req.params.userID)) {
        let id = req.params.userID;
        let xAuth = req.get("X-Authorization");
        User.getOnlineID(xAuth, function (r1) {
            if (r1.length == 1) {
                if (r1[0].userID == id) {
                    User.removeXAuth(xAuth, function(r2){
                        if(r2.affectedRows == 1){
                            User.setInActive(id, function(r3){
                                if(r3.affectedRows == 1){
                                    res.sendStatus(200)
                                } else {
                                    res.sendStatus(404);
                                }
                            })
                        } else {
                            res.sendStatus(404); // USER NOT FOUND
                        }
                    });
                } else {
                    res.sendStatus(403); // FORBIDDEN
                }
            } else {
                res.sendStatus(401); // UNAUTHORISED
            }
        });
    } else {
        res.sendStatus(400); // MALFORMED
    }

};

exports.login  = function(req, res) {
    const schema = UserSchemas.login;
    let jv = new validate.JSONValidation();
    let isValid = jv.validate(req, schema);
    if (isValid.ok){
        let name = req.query.username;
        let pass = req.query.password;
        User.signInStatus(name, pass, function (r1) {
            console.log(r1);
            if (r1.length == 1) {
                console.log(r1);
                let id = r1[0].userID;
                let online = r1[0].live;
                if (online != 1) {
                    User.makeXAuth(id, name, pass, res, function (r2) {
                        console.log(r2);
                    });
                }
                else {
                    User.getXAuth(id, function (r3) {
                        if (r3.length == 1) {
                            res.json(r3[0]);
                        } else {
                            res.sendStatus(500); // INTERNAL SERVER ERROR, FAIL TO MAKE X-AUTH
                        }
                    });
                }
            } else {
                res.sendStatus(400); // USERNAME/PASSWORD DO NOT MATCH
            }
        });
    } else {
        res.sendStatus(400); // MALFORMED
    }
};

exports.logout  = function(req, res) {
    const schema = UserSchemas.online;
    let jv = new validate.JSONValidation();
    let isValid = jv.validate(req, schema);
    if (isValid.ok) {
        let xAuth = req.get("X-Authorization");
        User.online(xAuth, function (r1) {
            console.log(r1);

            if(r1[0].live == 1){
                User.removeXAuth(xAuth, function(result){
                    if(result.affectedRows == 1){
                        res.sendStatus(200); //SUCCESS
                        return;
                    } else {
                        res.sendStatus(404); // UNAUTHORISED
                        return;
                    }
                });
            } else {
                res.sendStatus(401); // UNAUTHORISED - Not logged in
                return;
            }

        });
    } else {
        res.sendStatus(400); // MALFORMED
        return;
    }
};

