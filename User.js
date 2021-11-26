const mongoose = require('mongoose');

//basically the same as puttin the objects down there, but it's a detailed and separated way of doing it
const addressSchema = new mongoose.Schema({
  street: String,
  city: String
});

//required: if you don't put it in script, it won't work
//lower/uppercase = that's how it will show if you say that
//default = it will automatically add it no matter what
//immutable = you can't change what's in the script
//min or max something is gonna show error if rule broken
//that validate property is cool, says the error if the validator's rule is broken
const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 100,
    validate: {
      validator: v => v % 2 === 0,
      message: props => `${props.value} is not an even number`
    }
  },
  email: {
    type: String,
    minLength: 10,
    required: true,
    lowercase: true
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  },
  bestFriend: mongoose.SchemaTypes.ObjectId,
  hobbies: [String],
  address: addressSchema
});

module.exports = mongoose.model('User', userSchema);