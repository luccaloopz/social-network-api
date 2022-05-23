const { User, Thought, Reaction } = require('../models');

module.exports = {
    //this is where are my thought methods will go
    getThoughts(req, res) {
        Thought.find({})
        .then(thoughts => {
            return res.json(thoughts)
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then(thought => {
            !thought 
                ? res.status(404).json({ message: 'No thought with that ID' })
                :  res.json(thought)
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json(err);
        });
    }

};