
const mongoose = require('mongoose');
const passportLM = require('passport-local-mongoose');
const { username, password } = require('../config');

mongoose.connect(`mongodb+srv://${username}:${password}@cluster1.vqkbc8y.mongodb.net/userdb?retryWrites=true&w=majority`)
.then( () =>
    {console.log("db is connected")
}).catch (() => {
  console.log("db not connected");
})


// mongoose.connect("mongodb://localhost:27017/mongodb").then(() => console.log("db connected"))
// .catch(() => console.log("db not connected"));


const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  fullname: {
    type: String,
    required: true,
  },
  dp: String,
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  }]
});

userSchema.plugin(passportLM);

module.exports = mongoose.model("user", userSchema);
