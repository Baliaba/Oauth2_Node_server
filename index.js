require('dotenv').config()
const request = require('request-promise')
const btoa = require('btoa')
const {
    ISSUER,
    CLIENT_ID,
    CLIENT_SECRET,
    DEFAULT_SCOPE,
    PREFIX,
    PORT,
    DEFAULT_PORT
} = process.env
var express = require('express')
var app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

let getToken = async (token) => {
    try {
        const {
            token_type,
            access_token
        } = await request({
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
app.post(PREFIX + '/token', async (req, res) => {
    if (typeof req.body.client_id != "undefined" &&
        typeof req.body.client_secret != "undefined" &&
        req.body.scope != "undefined") {
        // req params founds 
        var client_id = req.body.client_id
        var client_secret = req.body.client_secret
        var scope = req.body.scope
        if (client_id != CLIENT_ID ||
            client_secret != CLIENT_SECRET ||
            scope != DEFAULT_SCOPE) {
            res.setHeader('Content-Type', 'application/json')
            res.status(401)
            res.json({
                "status_code": "401",
                "error ": "Unauthorized"
            })
        } else {
            var token = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
            getToken(token).then((authorization) => {
                if (typeof authorization != "undefined") {
                    var [authType, access_token] = authorization.split(' ')
                    var response = {
                        "scope": scope,
                        "expires_in": "3600s",
                        "token_type": authType,
                        "access_token": access_token,
                    }
                    res.setHeader('Content-Type', 'application/json')
                    res.status(200)
                    res.json(response)
                } else {
                    var response = {
                        "scope": scope,
                        "Error": "Internal server error",
                    }
                    res.setHeader('Content-Type', 'application/json')
                    res.status(500)
                    res.json(response)
                }

            })
        }
    } else {
        // client not found 
        res.setHeader('Content-Type', 'application/json')
        res.status(404)
        res.json({
            "status_code": "404",
            "error ": "Not Found"
        })
    }

})
const port = PORT || DEFAULT_PORT
app.listen(port, () => console.log(`Listening on port ${port}`))