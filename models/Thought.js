const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
const moment = require('moment');



const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: moment().format('YYYY-MM-DD hh:mm:ss'),
      get: (date)=>{ return moment(date).format('YYYY-MM-DD hh:mm:ss')},
    },
    username: {
      type: String,
      required: false,
    },
        
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    
  }
);

thoughtSchema
  .virtual('reactionCount')
  //getter
  .get(function () {
    return this.reactions.length;
  });


const Thought = model('thought', thoughtSchema);

module.exports = Thought;