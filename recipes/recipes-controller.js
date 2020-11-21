const _ = require('lodash')
const axios = require('axios')
const helloFresh = require('../services/hello-fresh-service')

exports.find = async (req, res) => {
    const id = _.get(req, 'params.id')
    const recipe = await helloFresh.getRecipe(id, req.cookies) 
    return res.status(200).send(recipe)
}

exports.favorites = async (req, res) => {
    const favorites = await helloFresh.getFavorites(req.cookies)
    return res.status(200).send(favorites)
}