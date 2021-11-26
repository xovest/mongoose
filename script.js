const mongoose = require('mongoose');
const User = require('./User');

mongoose.connect('mongodb://localhost/testdb');

run();
//create method to make the user
//save method guess what for the db
async function run() {
  try {
    const user = await User.create({
      name: 'Ryan', 
      age: 19,
      email: 'olarumonica2016@gmail.com',
      hobbies: ['Gaming', 'Programming'],
      address: {
        street: 'Musatini 23'
      }
    });
    user.name = 'Bob';
    console.log(user);
  } catch (e) {
    console.log(e.message);
  }
}
