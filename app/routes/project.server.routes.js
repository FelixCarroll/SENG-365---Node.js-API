const projects = require('../controllers/project.server.controller');

module.exports = function(app){

    app.route('/projects')
        .get(projects.list)
        .post(projects.create);

    app.route('/projects/:proID')
        .get(projects.read)
        .put(projects.updateProject);

    app.route('/projects/:proID/image')
        .get(projects.display)
        .put(projects.updateImage);

    app.route('/projects/:proID/pledge')
        .post(projects.add);

    app.route('/projects/:proID/rewards')
        .get(projects.displayRewards)
        .put(projects.updateRewards);
};