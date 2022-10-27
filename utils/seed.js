const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const moment = require('moment');
const {getRandomReactions, getRandomName } = require('./data');
connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await User.deleteMany({});

  // Drop existing students
  await Thought.deleteMany({});

  // Create empty array to hold the students
  const user = [];
  const thought = [];
  const reaction = [];

  users.push({
    username,
    email,
    thoughts,
    friends,
  });


  // Add students to the collection and await the results
  await User.collection.insertMany(user);

  // Add courses to the collection and await the results
  await Thought.collection.insertOne({
    courseName: 'UCLA',
    inPerson: false,
    reactions: getrandomReactions(4),
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(user);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
