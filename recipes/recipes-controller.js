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

exports.getConsolidatedYields = async (req, res) => {
    let ids = _.get(req, 'query.recipeIds', [])
    ids = Array.isArray(ids) ? ids : [ids]
    let promises = []
    ids.forEach(id => {
        const promise = helloFresh.getRecipe(id, req.cookies)
        promises.push(promise)
    })
    const recipes = await Promise.all(promises)

    return res.status(200).send(recipes)
}