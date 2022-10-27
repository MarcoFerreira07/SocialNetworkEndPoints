const { connect, connection } = require('mongoose');

//our database that we will use.
connect('mongodb://localhost/socialNetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;