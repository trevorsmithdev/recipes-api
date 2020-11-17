const _ = require('lodash')
const axios = require('axios')

exports.find = async (req, res) => {
    const id = _.get(req, 'params.id')
    if (!id) {
        return res.status(400).send({ error: 'Missing recipe id paramter' })
    }

    try {
        const { headers } = req
        const hfResponse = await axios.get(`https://www.hellofresh.com/gw/api/recipes/${id}`, { 
            headers: { 'authorization': headers.authorization } })
        const  { status } = hfResponse

        if (status === 200) {
            const { data } = hfResponse
            return res.status(200).send(data)
        }
    } catch (err) {
        return res.status(500).send({ err })
    }
    
}

exports.favorites = async (req, res) => {
    try {
        const { headers } = req
        const response = await axios.get('https://www.hellofresh.com/gw/api/customers/me/favorites', {
            params: {
                country: 'us',
                locale: 'en-US'
            },
            headers: { 'authorization': headers.authorization }
        })

        const { status } = response

        if (status === 200) {
            const { data } = response
            return res.status(200).send(data)
        }
        return res.status(status).send('Request Failed')

    } catch (err) {
        return res.status(500).send({ err })
    }
}