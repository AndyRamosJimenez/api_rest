const mongoose = require('mongoose');

async function dbConnection() {
  try {
    await mongoose.connect("mongodb+srv://m001-student:m001-mongodb-basics@sandbox.bmamo.mongodb.net/m001-student?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('database online');
  } catch (error) {
    console.log(error);
    throw new Error('Failed to start the database');
  }
}

module.exports = dbConnection
