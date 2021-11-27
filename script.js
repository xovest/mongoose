const mongoose = require('mongoose');
const User = require('./User');

mongoose.connect('mongodb://localhost/testdb');

run();
//create method to make the user
//save method guess what for the db
//the queries are similar to the mongodb ones from mongosh (use the ui one)
//where method = find based on name, age etc.
async function run() {
  try {
    const user = await User.where('name').equals('Ryan');
    console.log(user);
  } catch (e) {
    console.log(e.message);
  }
}
