const users = require('../controllers/user.server.controller');

module.exports = function(app){
    app.route('/users')
        .post(users.create);

    app.route('/users/:userID')
        .get(users.read)
        .put(users.update)
        .delete(users.delete);

    app.route('/users/login')
        .post(users.login);

    app.route('/users/logout')
        .post(users.logout);
};