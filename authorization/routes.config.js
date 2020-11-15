const authController = require('./authorization-controller');

exports.routesConfig = function (app) {

    app.post('/login', [
        authController.login
    ]);
};