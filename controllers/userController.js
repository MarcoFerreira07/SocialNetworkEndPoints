const User = require('../models/Users');
const Thought = require('../models/Thought');

const { ObjectId } = require('mongoose').Types;

// GET
function getUsers (req, res) {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err.message));
}

//GET
function getSingleUser(req, res) {
  User.findOne({ _id: req.params.userId })
    .select('-__v')
    .populate('friends')
    .populate('thoughts')
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'user not found' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err.message));
}

// POST
function createUser(req, res) {
  User.create(req.body)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err.message));
}

// UPDATE
function updateUser(req, res) {

  User.findOneAndUpdate(
    {_id: ObjectId(req.params.userId)},
    {$set: req.body},
    {runValidators:true, new: true}
  )
  .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err.message));
}

// DELETE
async function deleteUser(req, res) {
  
  let deletedUser = await User.findOneAndDelete({_id: ObjectId(req.params.userId)})
  console.log(deletedUser);
  if (!deletedUser){
       res.status(404).json({ message: 'user not found' });
       return
      }
  
  await Thought.deleteMany({ username: deletedUser.username });
  
 
  await User.updateMany({$pull: {friends:ObjectId(req.params.userId)}});
  
  res.json(deletedUser);
   
  
}

// POST
async function addFriend(req, res) {
  
  let validFriend = await User.findById({_id:ObjectId(req.params.friendId)});
  if (validFriend._id){
 
   let user = await User.findOneAndUpdate(
      {_id: ObjectId(req.params.userId)},
      {$addToSet: {friends:ObjectId(req.params.friendId)}},
      {runValidators:true, new: true}
      )
   if (!user) {
    res.status(404).json({ message: 'No user with this id!' })
    return
    } 
  
   let friend = await User.findOneAndUpdate(
            {_id: ObjectId(req.params.friendId)},
            {$addToSet: {friends:ObjectId(req.params.userId)}},
            {runValidators:true, new: true}
          )
   if (user && friend)  {     
          res.json(user);
    }
    else{res.status(404).json({ message: 'No friend with this id!' })}
    
  }
    else{
      res.status(404).json({ message: 'No friend with this id!' })
    }
}

// DELETE
async function deleteFriend(req, res) {
 
  let validFriend = await User.findById({_id:ObjectId(req.params.friendId)});
  if (validFriend._id){
    
    let user = await User.findOneAndUpdate(
      {_id: ObjectId(req.params.userId)},
      {$pull: {friends:ObjectId(req.params.friendId)}},
      {runValidators:true, new: true}
      )
   if (!user) {
    res.status(404).json({ message: 'No user with this id!' })
    return
    } 

   let friend = await User.findOneAndUpdate(
            {_id: ObjectId(req.params.friendId)},
            {$pull: {friends:ObjectId(req.params.userId)}},
            {runValidators:true, new: true}
          )
   if (user && friend)  {     
          res.json(user);
    }
    else{res.status(404).json({ message: 'No friend with this id!' })}
    
  }
    else{
      res.status(404).json({ message: 'No friend with this id!' })
    }
}

module.exports = {
 getUsers,
  getSingleUser, 
  createUser, 
  updateUser, 
  deleteUser, 
  addFriend, 
  deleteFriend
};