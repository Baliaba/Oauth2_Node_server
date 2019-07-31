require('dotenv').config()
const request = require('request-promise')
const btoa = require('btoa')
const { ISSUER, CLIENT_ID, CLIENT_SECRET, DEFAULT_SCOPE, PREFIX, PORT } = process.env
var express = require('express')
var app = express()

const test = async (token) => {
    try {
        const { token_type, access_token } = await request({
            uri: `${ISSUER}/v1/token`,
            json: true,
            method: 'POST',
            headers: {
                authorization: `Basic ${token}`,
            },
            form: {
                grant_type: 'client_credentials',
                scope: DEFAULT_SCOPE,
            },
        })
        let auth = [token_type, access_token].join(' ')
        return auth
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
}
app.get(PREFIX + '/token',  (req, res) => {
    // console.log(req.query.CLIENT_ID)
    const requestToken = btoa(`${req.query.client_id}:${req.query.client_secret}`);
    const token = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
    if (requestToken != token) {
        //console.log(requestToken , "--->", token)
        res.setHeader('Content-Type', 'application/json')
        res.status(401)
        res.json({ "Error 401 ": "Unauthorized" })
    } else {
        test(token).then((authorization) => {
            //const [authType, token] = auth.split(' ')
            console.log(authorization)
            res.setHeader('Content-Type', 'application/json')
            res.status(200)
            const [authType, access_token] = authorization.split(' ')
            var response =
            { 
                 "scope" : DEFAULT_SCOPE,
                 "expires_in": 3600,
                 "token_type": authType,
                 "access_token": access_token,
            }
            res.json(response)
        })
    }

})
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))

