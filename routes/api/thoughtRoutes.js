const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addThoughtReaction,
    removeThoughtReaction
  } = require('../../controllers/thoughtController');
 
router.route('/').get(getThoughts).post(createThought);

//single
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);


//specific id reaction to add
router.route('/:thoughtId/reactions').post(addThoughtReaction);

//thoughts id reaction then reaction id to remove
router.route('/:thoughtId/reactions/:reactionId').delete(removeThoughtReaction);

module.exports = router;