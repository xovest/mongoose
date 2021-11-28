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
//for bf adding in script: user[0].bestfriend = id; and then await user[0].save() and if you add the populate prop it will show the bf details
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
  bestFriend: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  hobbies: [String],
  address: addressSchema
});

userSchema.methods.hola = function() {
  console.log(`yo hola ${this.name}`);
};

//static stuff => only one func: eg. findByName()
userSchema.statics.findByName = function(name) {
  return this.find({ name: new RegExp(name, 'i')});
};

//query stuff => multiple funcs: eg. find().byName()
userSchema.query.byName = function(name) {
  return this.where({ name: new RegExp(name, 'i')});
}

//virtual (doesn't save but still, you can log something like that out cool)
userSchema.virtual('namedEmail').get(function() {
  return `${this.name} <${this.email}>`;
});

module.exports = mongoose.model('User', userSchema);