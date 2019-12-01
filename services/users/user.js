/********
 * user.js file (services/users)
 ********/

const request = require('request-promise')
const express = require('express');
const User = require('../../models/user');
const btoa = require('btoa');

const getUsers = async (req, res, next) => {
    try {

        let users = await User.find({});

        if (users.length > 0) {
            return res.status(200).json({
                'message': 'users fetched successfully',
                'data': users
            });
        }

        return res.status(403).json({
            'code': 'FORBIDDEN_ERROR',
            'description': 'No users found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const getUserById = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id);
        if (user) {
            return res.status(200).json({
                'message': `user with id ${req.params.id} fetched successfully`,
                'data': user
            });
        }

        return res.status(403).json({
            'code': 'FORBIDDEN_ERROR',
            'description': 'No users found in the system'
        });

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const createUser = async (req, res, next) => {
    try {

        const {
            client_id,
            client_secret,
            scope,
            grant_type
        } = req.body;

        if (client_id === undefined || client_id === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'client_id is required',
                'field': 'client_id'
            });
        }

        if (client_secret === undefined || client_secret === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'client_secret is required',
                'field': 'client_secret'
            });
        }

        if (scope === undefined || scope === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'scope is required',
                'field': 'scope'
            });
        }

        if (grant_type === undefined || grant_type === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'grant_type is required',
                'field': 'grant_type'
            });
        }

        const temp = {
            client_id : client_id,
            client_secret :client_secret,
            scope : scope,
            grant_type : grant_type
        };

        let newUser = await User.create(temp);

        if (newUser) {
            return res.status(201).json({
                'message': 'New client Was created successfully',
                'data': newUser
            });
        } else {
            throw new Error('something went worng');
        }
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const {
            client_id,
            client_secret,
            scope,
            grant_type
        } = req.body;

        if (client_id === undefined || client_id === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'client_id is required',
                'field': 'client_id'
            });
        }

        if (client_secret === undefined || client_secret === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'client_secret is required',
                'field': 'client_secret'
            });
        }

        if (scope === undefined || scope === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'scope is required',
                'field': 'scope'
            });
        }

        if (grant_type === undefined || grant_type === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'grant_type is required',
                'field': 'grant_type'
            });
        }

        let isUserExists = await User.findById(userId);

        if (!isUserExists) {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No user found in the system'
            });
        }

        const temp = {
            client_id : client_id,
            client_secret :client_secret,
            scope : scope,
            grant_type : grant_type
        };

        let updateUser = await User.findByIdAndUpdate(userId, temp, {
            new: true
        });

        if (updateUser) {
            return res.status(200).json({
                'message': 'user updated successfully',
                'data': updateUser
            });
        } else {
            throw new Error('something went worng');
        }
    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}
let generateToken = async (req, res, next) => {
    console.log("djhdkhkjd ",req.body)
    try {
        const userId = req.params.id;
        const {
            client_id,
            client_secret,
            scope,
            grant_type
        } = req.body;

        if (client_id === undefined || client_id === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'client_id is required',
                'field': 'client_id'
            });
        }

        if (client_secret === undefined || client_secret === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'client_secret is required',
                'field': 'client_secret'
            });
        }

        if (scope === undefined || scope === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'scope is required',
                'field': 'scope'
            });
        }

        if (grant_type === undefined || grant_type === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'grant_type is required',
                'field': 'grant_type'
            });
        }
        const temp = {
            client_id : client_id,
            client_secret :client_secret,
            scope : scope,
            grant_type : grant_type
        };
// CODE HERE

        var token = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`)
        getOktaToken(token).then((authorization) => {
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
    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const deleteUser = async (req, res, next) => {
    try {
        let user = await User.findByIdAndRemove(req.params.id);
        if (user) {
            return res.status(204).json({
                'message': `user with id ${req.params.id} deleted successfully`
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No users found in the system'
        });

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}


let getOktaToken = async (token) => {
    console.log(token)
    try {
        const {
            token_type,
            access_token
        } = await request({
            uri: `${process.env.ISSUER}/v1/token`,
            json: true,
            method: 'POST',
            headers: {
                authorization: `Basic ${token}`,
            },
            form: {
                grant_type: 'client_credentials',
                scope: process.env.DEFAULT_SCOPE,
            },
        })
        let auth = [token_type, access_token].join(' ')
        return auth
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
}

module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    generateToken : generateToken
}