const router = require('express').Router();

const {
    //this is where I'll put all of the methods within userController.js
    getUsers,
    getSingleUser,

} = require('../../controllers/userController');

router.route('/').get(getUsers).post();

router.route('/:userId').get(getSingleUser)