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

    const yields = recipes.reduce((prev, cur) => {
        const ingredientList = cur.ingredients
        cur.yields.find(y => y.yields === 2).ingredients.forEach(i => {
            let ingredient = prev[i.id]
            if (ingredient) {
                prev[i.id] = { ...ingredient, amount: ingredient.amount + i.amount }
            }
            else {
                const info = ingredientList.find(ing => ing.id === i.id)
                const { name, slug, imageLink } = info
                prev[i.id] = { ...i, name, slug, imageLink }
            }
        })
        return prev
    }, {})

    const list = Object.keys(yields).map(id => {
        const food = yields[id]
        return food
    })

    const responseBody = { count: list.length, items: list }

    return res.status(200).send(responseBody)
}