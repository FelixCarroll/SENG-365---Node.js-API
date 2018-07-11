const db = require("./config/db"),
    express = require("./config/express");

const app = express();
app.use(log_action);


function log_action(req, res, next){
    console.log(req.method, req.originalUrl);
    next();
}

//connect to mysql on start


db.connect(function(err){
    console.log(">>>", err);
    if(err) {
        console.log("unable to connect ot mysql database.");
        process.exit(1);
    } else {
        console.log("live :)");
        app.listen(4941, function(){
            console.log('Listening on port: ' + 4941);
        });
    }
});