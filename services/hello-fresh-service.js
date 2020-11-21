const _ = require('lodash')
const axios = require('axios')

exports.helloFreshError = {
    UNAUTHORIZED: 'unauthorized',
    NOT_FOUND: 'not_found',
    MISSING_ACCESS_TOKEN: 'missing_access_token'
}

exports.getRecipe = async (id, { access_token }) => {
    const ROOT = process.env.HELLO_FRESH_API_ROOT
    let recipe = {}
    if (access_token) {
        const headers = getHeaders(access_token)
        try {
            const response = await axios.get(`${ROOT}/recipes/${id}`, { headers })
            recipe = _.get(response, 'data', {})
        } catch (err) {
            recipe.error = this.helloFreshError.UNAUTHORIZED
            console.log(err)
        }
    }
    else {
        recipe.error = this.helloFreshError.MISSING_ACCESS_TOKEN
    }
    return recipe
}

exports.getFavorites = async ({ access_token }) => {
    const ROOT = process.env.HELLO_FRESH_API_ROOT
    let favorites = { items: [] }
    if (access_token) {
        const headers = getHeaders(access_token)
        const params = { country: 'us', locale: 'en-US' }
        try {
            const response = await axios.get(`${ROOT}/customers/me/favorites`, { params, headers })
            favorites.items = _.get(response, 'data.items', [])
        } catch (error) {
            favorites.error = this.helloFreshError.UNAUTHORIZED
        }
    }
    else {
        favorites.error = this.helloFreshError.MISSING_ACCESS_TOKEN
    }
    return favorites
}

function getHeaders (access_token) {
    const headers = { authorization: `Bearer ${access_token}`}
    return headers
}