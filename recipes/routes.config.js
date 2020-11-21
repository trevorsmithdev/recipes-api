const recipesController = require('./recipes-controller')
const authMiddleware = require('../authorization/auth-middleware')

exports.routesConfig = function (app) {

    app.get('/recipes/:id', recipesController.find)

    app.get('/favorites', recipesController.favorites)

    app.get('/yields', recipesController.getConsolidatedYields)

};