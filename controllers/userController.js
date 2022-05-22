const { User, Thought, Reaction } = require('../models');

const headCount = 

module.exports = {
    //this is where are my user methods will go
    getUsers(req, res) {
        User.find({})
        .then(students => {
            return res.json(students);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .then(student => {
            !student 
                ? res.status(404).json({ message: 'No student with that ID' })
                :  res.json(student)
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },


};