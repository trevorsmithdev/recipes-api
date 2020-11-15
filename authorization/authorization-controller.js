const axios = require('axios')
const _ = require('lodash')

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body || {}
        const hfResponse = await axios.post("https://www.hellofresh.com/gw/login", { username, password })

        if (hfResponse.status === 200) {
            const { access_token, refresh_token } = hfResponse.data || {}
            res.cookie('access_token', access_token)
            res.cookie('refresh_token', refresh_token)
            res.status(201).send({ access_token, refresh_token })
        }
        else {
            res.status(401).send({})
        }
        
    } catch (error) {
        res.status(500).send({ error })
    }
}