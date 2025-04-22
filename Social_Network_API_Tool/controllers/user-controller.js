//converts userId string into an ObjectId for querying db
const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

//get all users
module.exports = {
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                const userObj = {
                    users,
                    //Check for issues here
                };
                return res.json(userObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //get one user by id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .lean()
            .then(async (users) =>
                !user
                    ? res.status(404).json({ message: 'no user found with that ID' })
                    : res.json({
                        user,
                        //check for err here
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //create user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    //delete user
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !student
                    ? res.status(404).json({ message: 'No user found' })
                    : User.findOneAndUpdate(
                        { users: req.params.userId },
                        { $pull: { students: req.params.studentId } },
                        { new: true }
                    )
                //look for err in delte user
            )
    },
    //add buddy to a user
    addBuddy(req, res) {
        console.log('you are adding a buddy');
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.studentId },
            { $addToSet: { assignments: req.body } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'no user found with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    //remove buddy from a user
    removeBuddy(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { buddy: { buddyId: req.params.buddyId } } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !student
                    ? res
                        .status(404)
                        .json({ message: 'no user found with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};
