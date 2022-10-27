const userData = [
{
  username:"marco",
  email:"marcosemail@marcosemail.com"
},
{
  username:"marco2",
  email:"2marcosemail@marcosemail.com"
},
{
  username:"marco3",
  email:"3marcosemail@marcosemail.com"
},
{
  username:"marco4",
  email:"4marcosemail@marcosemail.com"
},
{
  username:"marco5",
  email:"5marcosemail@marcosemail.com"
},
{
  username:"marco6",
  email:"6marcosemail@marcosemail.com"
},

]
const thoughtData = [
  {
    thoughtText: "1st thought"
  },
  {
    thoughtText: "2nd thought"
  },
  {
    thoughtText: "3rd thought"
  },
  {
    thoughtText: "4th thought"
  },
  {
    thoughtText: "5th thought"
  },

]

const reactionData = [
  {
    reactionBody: "reacting to body"
  },
  {
    reactionBody: "reacting 2 body"
  },
  {
    reactionBody: "reacting 3 body"
  },
  {
    reactionBody: "reacting 4 body"
  },
  {
    reactionBody: "reacting 5 body"
  },

]

// Get a random item given an array
const genRandomIndex = (arr) => Math.floor(Math.random() * arr.length);
const getRandomThought = () => {
     return thoughtData[genRandomIndex(thoughtData)];
  };

// Export the functions for use in seed.js
module.exports = {userData,
   thoughtData, 
   reactionData, 
   genRandomIndex, 
   getRandomThought}
