const mongoose = require('mongoose');
const User = require('./User');

mongoose.connect('mongodb://localhost/testdb');

run();
async function run() {
  const user = await User.create({
    name: 'Ryan', 
    age: 19,
    hobbies: ['Gaming', 'Programming'],
    address: {
      street: 'Musatini 23'
    }
  });
  user.name = 'Bob';
  console.log(user);
}
