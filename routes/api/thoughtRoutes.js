const router = require('express').Router();

const {
    //this is where I'll put all of the methods within thoughtController.js
    getThoughts,


} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post();

router.route('/:thoughtId').get().put().delete();

router.route('/:thoughtId/reactions').post().delete();

module.exports = router;