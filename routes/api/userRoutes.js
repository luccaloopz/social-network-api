const router = require('express').Router();

const {
    //this is where I'll put all of the methods within userController.js
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete();

router.route('/:userId/friends/:friendId').post().delete();

module.exports = router;