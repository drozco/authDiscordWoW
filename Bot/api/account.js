const axios = require('axios')
const { apiUrl } = require('../config.json')

const createAccount = (data) => {
    return axios.post(apiUrl+'/api/account/add', data)
    .then((response) => {
        return response.data
    })
}

module.exports = {
    createAccount,
}