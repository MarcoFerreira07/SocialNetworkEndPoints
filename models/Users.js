const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 45,
      trim: true
    },
    email:{ 
      type: String,
      required: true,
      unique: true,
      trim: true,
      match:[/.+\@.+\..+/, 'email invalid']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends:[
      {
        type: Schema.Types.ObjectId, 
        ref:'user'
      }
       
    ]
  },
  {
    // virtual
    toJSON: {
      virtuals: true,
    }
  }
);

//virtual
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  })
 


const Users = model('user', userSchema);

module.exports = Users;