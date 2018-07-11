const express = require('express'),
    bodyParser = require('body-parser'),
    mysql = require("mysql");

module.exports = function(){
    const app = express();
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    require('../app/routes/user.server.routes.js')(app);
    require('../app/routes/project.server.routes.js')(app);
    require('./helper.js')(app);
    return app;
};
