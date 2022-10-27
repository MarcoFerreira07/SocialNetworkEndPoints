const { Schema, Types } = require('mongoose');
const moment = require('moment');

// Schema for our reaction model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
     
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: moment().format('YYYY-MM-DD hh:mm:ss'),
      get: (date)=>{ return moment(date).format('YYYY-MM-DD hh:mm:ss')},
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
    
  }
);

module.exports = reactionSchema;