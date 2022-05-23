const { User, Thought, Reaction } = require('../models');

module.exports = {
    //this is where are my user methods will go
    getUsers(req, res) {
        User.find({})
        .then(users => {
            return res.json(users);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .then(user => {
            !user 
                ? res.status(404).json({ message: 'No user with that ID' })
                :  res.json(user)
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    createUser(req, res) {
        User.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err))
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then(user => {
            !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
        })
        .catch(err => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId})
        .then(user => {
            !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
        })
        .catch(err => res.status(500).json(err))
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId }, 
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
        )
        .then(user => {
            !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
        })
        .catch(err => res.status(500).json(err))
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId }, 
            { $pull: { friend: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
        )
        .then(user => {
            !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
        })
        .catch(err => res.status(500).json(err))
    }
};