const recipesController = require('./recipes-controller')
const authMiddleware = require('../authorization/auth-middleware')

exports.routesConfig = function (app) {

    app.get('/recipes/:id', [
        authMiddleware.setAuthHeader,
        recipesController.find
    ]);

};