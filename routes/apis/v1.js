/********
 * v1.js file (inside routes/apis)
 ********/

const userController = require('../../controllers/apis/user');

const express = require('express');
let router = express.Router();
router.use('/users', userController);
module.exports = router;