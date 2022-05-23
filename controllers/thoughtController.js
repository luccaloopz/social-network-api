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
    },

    createThought(req, res) {
        Thought.create(req.body)
        .then(thought => {

        })
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then(thought => {
            !thought 
                ? res.status(404).json({ message: 'No thought with that ID' })
                :  res.json(thought)
        })
        .catch(err => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then(thought =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then(user =>
                !user
                    ? res.status(404).json({
                        message: 'Thought deleted, but no users found',
                    })
                    : res.json({ message: 'Thought successfully deleted' })
            )
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    
    
 
};