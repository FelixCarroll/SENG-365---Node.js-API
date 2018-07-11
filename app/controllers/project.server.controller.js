const Project = require('../models/project.server.model'),
    User = require('../models/user.server.model'),
    validate = require("json-validation"),
    projectSchemas = require("../schemas/project.schema.js"),
    multer = require("multer"),
    fs = require("fs")

let Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./Images");
    },
    filename: function(req, file, callback) {
        callback(null, req.params.proID);
    }
});

let upload = multer({storage: Storage})
    .array("image", 3);

exports.create  = function(req, res) { // INSERT NEW USER
    const schema = projectSchemas.project;
    let jv = new validate.JSONValidation();
    let isValid = jv.validate(req, schema);
    console.log(isValid.errors);
    if (isValid.ok) {
        let tokenID = req.headers["x-authorization"];
        User.getOnlineID(tokenID, function (online) { //CHECK IF USER ONLINE\
            if(online){
                let userID = online[0].userID;
                let title = req.body.title;
                let sub = req.body.subtitle;
                let desc = req.body.description;
                let target = req.body.target;
                let msg = {"creators" : []}
                Project.insert(title, sub, desc, target, function (result1){
                    console.log(result1)
                    if(result1.affectedRows == 1){
                        let projectID = result1.insertId;
                        let creators = req.body.creators;
                        let rewards = req.body.rewards;
                        Project.addCreator(projectID, userID, function(result2) {
                            if(result2.affectedRows == 1){
                                creators.forEach(function (c){
                                    Project.getUserID(c.name, function (result3) {
                                        if(result3.length == 1){
                                            Project.addCreator(projectID, result3[0].userID, function(r){});
                                        }
                                    });
                                });
                                rewards.forEach(function (r){
                                    Project.addRewards(projectID, r.amount, r.description, function(t){});
                                });
                                Project.setImage(projectID, function (result4) {
                                    console.log(result4)
                                    if(result4.affectedRows == 1){
                                        res.sendStatus(201);
                                    } else {
                                        res.sendStatus(500);
                                    }
                                })

                            } else {
                                res.sendStatus(500); // FAILURE
                            }
                        });
                    } else {
                        res.sendStatus(500) // ERROR
                    }
                });
            } else {
                res.sendStatus(401) // UNAUTHORISED - CREATE ACCOUNT TO CREATE PROJECT
            }
        })
    } else {
        res.sendStatus(400); // MALFORMED PROJECT DATA
    }
};

exports.updateProject = function(req, res){ // TEMP - DISPLAY ALL USERS INFO
    const schema = projectSchemas.update;
    let jv = new validate.JSONValidation();
    let isValid = jv.validate(req, schema);
    console.log(isValid.ok, isValid.errors);
    if (isValid.ok) {
        let tokenID = req.headers["x-authorization"];
        User.getOnlineID(tokenID, function (online) { //CHECK IF USER ONLINE RETURNS ID
            if(online.length == 1) {
                let userID = online[0].userID;
                let projectID = req.params.proID;
                Project.alterProject(projectID, userID, function (r1) {
                    console.log(r1)
                    if(r1[0].canEdit){
                        Project.setOpen(projectID, req.body.open, function (r2) {
                            if(r2.affectedRows == 1){
                                res.sendStatus(201);
                            } else {
                                res.sendStatus(500); // INTERNAL ERROR
                            }
                        });
                    } else {
                        res.sendStatus(403); // FORBIDDEN - unable to update a project you do not own
                    }
                });
            } else {
                res.sendStatus(401); // Unauthorized - create account to update project
            }
        });
    } else {
        res.sendStatus(400); // MALFORMED REQUEST
    }
};

exports.display = function(req, res){ // TEMP - DISPLAY ALL USERS INFO
    const schema = projectSchemas.getProID;
    let jv = new validate.JSONValidation();
    let isValid = jv.validate(req, schema);
    if (isValid.ok && !isNaN(req.params.proID)) {
        let id = req.params.proID;
        Project.isProject(id, function(result){
           if(result[0].project == 1){
                fs.readFile("./Images/"+id.toString(), function (err, data) {
                   if(err){
                       res.sendStatus(404);
                   } else {
                       res.write(data);
                       res.end();
                   }
                });
           } else {

               res.sendStatus(404);
           }
        });
    } else {
        res.sendStatus(400); // MALFORMED
    }
};

exports.updateImage = function(req, res){ // TEMP - DISPLAY ALL USERS INFO
    const schema = projectSchemas.image;
    let jv = new validate.JSONValidation();
    let isValid = jv.validate(req, schema);
    if (isValid.ok && !isNaN(req.params.proID)) {
        let tokenID = req.headers["x-authorization"];
        User.getOnlineID(tokenID, function (online) { //CHECK IF USER ONLINE RETURNS ID
            if(online.length == 1) {
                let userID = online[0].userID;
                let proID = req.params.proID;
                Project.isCreator(proID, userID, function (result) {
                    if(result[0].creator == 1){
                        upload(req, res, function (err) {
                            if (err) {
                                return res.sendStatus(500);
                            }
                            Project.setImage(proID, function (result2) {
                                if (result2.affectedRows == 1) {
                                    return res.sendStatus(200);
                                } else {
                                    res.sendStatus(500);
                                }
                            });
                        });
                    } else {
                        res.sendStatus(403);
                    }
                });
            } else {
                res.sendStatus(401); // Unauthorized - create account to update project
            }
        });
    } else {
        res.sendStatus(400);
    }
};

exports.add = function(req, res){ // TEMP - DISPLAY ALL USERS INFO
    const schema = projectSchemas.give;
    let jv = new validate.JSONValidation();
    let isValid = jv.validate(req, schema);
    if (isValid.ok && !isNaN(req.params.proID)) {
        let tokenID = req.headers["x-authorization"];
        User.getOnlineID(tokenID, function (online) {//CHECK IF USER ONLINE
            if(online){
                let userID = online[0].userID;
                let proID = req.params.proID;
                Project.getCreators(proID, function (creators) {
                    console.log(creators);
                    if(creators.length != 0) {
                        for(let c in creators){
                            console.log(creators[c].userID, userID);
                            if(creators[c].userID == userID){
                                res.sendStatus(403)
                                return;
                            }
                        }
                        let amount = req.body.amount;
                        let anon = req.body.anonymous;
                        Project.insertPledge(proID, userID, amount, anon, function (result) {
                           console.log(result)
                            if(result.affectedRows == 1){
                               res.sendStatus(200);
                           } else {
                               res.sendStatus(500);
                           }
                        });
                    } else {
                        res.sendStatus(404)
                    }
                });
            } else {
                res.sendStatus(401);
            }
        });
    } else {
        res.sendStatus(400); // MALFORMED
    }
};

exports.list = function(req, res){ // DISPLAY ALL PROJECTS
    let startIndex = req.query.startIndex || 0;
    let count = req.query.count || 0;
    Project.getAll(startIndex, count, function (result) {
        res.json(result);
    });

};

exports.read  = function(req, res) { // GET SINGLE USER INFO
    if(req.params.hasOwnProperty("proID") && typeof req.params.proID !== 'undefined' && !isNaN(req.params.proID)){
        let id = req.params.proID;
        let msg = {}
        Project.getOne(id, function(r1){
            console.log(r1[0]);
            if(r1.length == 1) {
                msg["project"] = {}
                msg["project"]["id"] = r1[0].projectID;
                msg["project"]["creationDate"] = r1[0].creationDate;
                msg["project"]["data"] = {
                    "title" : r1[0].title,
                    "subtitle" : r1[0].subtitle,
                    "description" : r1[0].desciption,
                    "imageUri" : r1[0].imageURI,
                    "target" : r1[0].target
                };
                Project.getCreators(id, function(r2){
                   msg["project"]["data"]["creators"] = r2;
                   Project.getRewards(id, function(r3){
                       msg["project"]["data"]["rewards"] = r3;
                       Project.getProgress(id, function(r4){
                           console.log(r4);
                           console.log(">>" , r4)
                           let total = r4[0].total;
                           if(r4[0].total == null) { total = 0;}
                           let tally = r4.total;
                           if(r4[0].tally == 0) { tally = 0;}
                           msg["progress"] = {
                               "target" : r1[0].target,
                               "currentPledged" : r4[0].total || 0,
                               "numberOfBackers" : r4[0].tally || 0
                           };
                           Project.getBackers(id, function(r5){
                              msg["backers"] = r5;
                              res.json(msg);
                           });
                       });
                   });
                });
            } else {
                res.sendStatus(404);
            }
        });
    } else {
        res.sendStatus(400); // MALFORMED
    }
};



//// REWARDS /////

exports.displayRewards = function (req, res) {
    const schema = projectSchemas.getProID;
    let jv = new validate.JSONValidation();
    let isValid = jv.validate(req, schema);
    if (isValid.ok && !isNaN(req.params.proID)) {
        let id = req.params.proID;
        Project.isProject(id, function (result) {
            console.log(result)
            if(result[0].project == 1){
                Project.getRewards(id, function(result2){
                    res.json(result2);
                })
            } else {
                res.sendStatus(404);
            }
        })
    } else {
        res.sendStatus(400);
    }
};

exports.updateRewards = function (req, res) {
    const schema = projectSchemas.rewards;
    let jv = new validate.JSONValidation();
    let isValid = jv.validate(req, schema);
    console.log(isValid.ok, isValid.errors);
    if (isValid.ok && !isNaN(req.params.proID)) {
        let proID = req.params.proID;
        Project.isProject(proID, function (result) {
            if(result[0].project == 1){
                let tokenID = req.headers["x-authorization"];
                Project.getOnlineID(tokenID, function (online) {
                    if(online.length == 1){
                        let userID = online[0].userID;
                        Project.isCreator(proID, userID, function (result2) {
                            if(result2[0].creator == 1){
                                Project.clearRewards(proID, function (result3) {
                                    for(let i in req.body.rewards){
                                        let amount = req.body.rewards[i].amount;
                                        let desc = req.body.rewards[i].description;

                                        Project.addRewards(proID, amount, desc, function(r4){
                                            console.log(r4)
                                            if(r4.affectedRows != 1){
                                                return res.sendStatus(500);
                                            }
                                        });

                                    }
                                    res.sendStatus(201);
                                });
                            } else {
                                res.sendStatus(403);
                            }
                        })
                    } else {
                        res.sendStatus(401);
                    }
                })
            } else {
                res.sendStatus(404);
            }
        })
    } else {
        res.sendStatus(400);
    }
};