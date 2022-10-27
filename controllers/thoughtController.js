const { Thought, User } = require('../models');
const { ObjectId } = require('mongoose').Types;

//GET 
function getThoughts(req, res) {
  Thought.find()
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
}

// POST 
function createThought(req, res) {
  //Create
  Thought.create(req.body)
    .then((thought) => {
      //Then update the user
      return User.findOneAndUpdate(
        { _id: ObjectId(req.body.userId) },
        { $addToSet: { thoughts: ObjectId(thought._id) } },
        { new: true }
      );
    })
    .then((user) =>
      !user
        ? res.status(404).json({
            message: 'Thought created, but found no user with that ID',
          })
        : res.json('Created the thought 💭')
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

// GET 
function getSingleThought(req, res) {
  Thought.findOne({ _id: req.params.thoughtId })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
}



//PUT 
function updateThought(req, res) {
  Thought.findOneAndUpdate(
    { _id: ObjectId(req.params.thoughtId) },
    { $set: {thoughtText: req.body.thoughtText}},
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with this id!' })
        : res.json(thought)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

//DELETE
async function deleteThought(req, res) {
  //first delete the thought
  let deletedThought = await  Thought.findOneAndRemove({ _id: req.params.thoughtId })
  if (!deletedThought){
       res.status(404).json({ message: 'No thought with this id!' });
       return
  }

  let updatedUser = await User.findOneAndUpdate(
            { username: deletedThought.username },
            { $pull: { thoughts: ObjectId(req.params.thoughtId) } },
            { new: true }
          )
    
  
  if (!updatedUser){
    res.status(404).json({ message: 'Thought deleted but no user with this thought id!' })
    return
  }
  
  res.json({ message: 'Thought successfully deleted and User Updated!' } + deletedThought)
  
}

// POST
function addThoughtReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: ObjectId(req.params.thoughtId) },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with this id!' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
}

// DELETE
function removeThoughtReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: ObjectId(req.params.thoughtId) },
    { $pull: { reactions: { _id: ObjectId(req.params.reactionId) } } },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with this id!' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
}





module.exports = {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addThoughtReaction,
  removeThoughtReaction
};