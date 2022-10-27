const router = require('express').Router();
//need get multiple single create update delte and add
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

// 
router.route('/').get(getUsers).post(createUser);

// sing user 
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

//frined id. 
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;