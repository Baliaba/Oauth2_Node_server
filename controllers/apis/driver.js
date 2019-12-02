/********
 * user.js file (controllers/apis)
 ********/

const express = require('express');
const userService = require('../../services/users/user');
let router = express.Router();

router.get('/', userService.getUsers);

/**
 * @api {post} api/v1/users/token  get a token for an authenticated client
 * @apiVersion 1.0.0
 * @apiName getDriver
 * @apiGroup driver
 *
 * @apiParam (Request body) {String} client_id The User client_id
 * @apiParam (Request body) {String} client_secret The User client_secret
 * @apiParam (Request body) {String} client_scope The user client_scope
 * @apiParam (Request body) {String} client_grant_type The user client_grant_type
 *
 *
 * @apiSuccess {String} _id The user id
 * @apiSuccess {String} client_id The user client_id
 * @apiSuccess {String} client_scope The user client_scope
 * @apiSuccess {String} client_grant_type The user client_grant_type
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     [{
        "scope": "api_post",
        "expires_in": "3600s",
        "token_type": "Bearer",
        "access_token": "eyJraWQiOiJ
 *      }]
 *
 *     @apiError 401 Erreur retourné l'orsque le serveur d'auth ne reconais pas les credentials de l'utilisateur
 *     @apiErrorExample {json} Error - 401 :
 *     HTTP/1.1 401 Utilisateur non authentifié
 *     {
 *       "error": "Unautorize user"
 *     }
 *
 *      @apiError 404 route pas trouvé lors de l'appel au service de generation du token
 *     @apiErrorExample {json} Error - 404 :
 *     HTTP/1.1 404 Ressource pas trouvé
 *     {
 *       "error": "Not Found user"
 *     }
 *
 *     @apiError 500 erreur interne au serveur d'application
 *     @apiErrorExample {json} Error - 500 :
 *     HTTP/1.1 500 Erreur interne au serveur
 *     {
 *       "error": "Internal server Error"
 *     }
 *
 *     @apiError 422  Missing data (BAD REQUEST)
 *     @apiErrorExample {json} Error - 422 :
 *     HTTP/1.1 422 Erreur interne au serveur
 *     {
 *       "error": "Internal server Error Harold"
 *     }
 */
router.post('/token/', userService.generateToken);

router.get('/:id', userService.getUserById);

router.post('/', userService.createUser);

router.put('/:id', userService.updateUser);

router.delete('/:id', userService.deleteUser);

module.exports = router;