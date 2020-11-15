const _ = require('lodash')

exports.setAuthHeader = (req, res, next) => {
    const access_token = _.get(req, 'cookies.access_token')
    const refresh_token = _.get(req, 'cookies.refresh_token')

    if (access_token) {
        req.headers['authorization'] = `Bearer ${access_token}`
        return next()
    }
    return res.status(401).send({ message: 'Unauthorized'})
}