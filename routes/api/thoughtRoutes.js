const router = require('express').Router();

const {
    //this is where I'll put all of the methods within thoughtController.js
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,


} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post().delete();

module.exports = router;