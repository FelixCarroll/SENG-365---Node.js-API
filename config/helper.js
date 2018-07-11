/**
 * Created by fjc43 on 20/08/17.
 */
const temp = require("./db.js")


exports.list = [];

module.exports = function(app) {
    app.route("/help")
        .get(helper)
}

add = function (data) {
    list.push(data);
};

let helper = function(req, res){
    res.send(temp.senddata());
};