const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    addBuddy,
    removeBuddy,
} = require('../../controllers/user-controller');

// api users
router.route('/').get(getUsers).post(createUser);

// api users id
router.route('/:userId').get(getSingleUser).delete(deleteUser);

//api users id buddy
router.route('/userId/buddies').post(addBuddy);

//api users id remove buddy
router.route('/:userId/buddies/:buddyId').delete(removeBuddy);

module.exports = router;

//complete
