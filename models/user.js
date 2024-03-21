const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (doc, objToReturn) => {
    objToReturn.id = objToReturn._id.toString()
    delete objToReturn._id
    delete objToReturn.__v
    delete objToReturn.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)