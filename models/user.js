const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    tokens: [
        {
          token: {
            type: String,
            required: true,
          },
        },
      ],
})

const User = mongoose.model('User', userSchema)
module.exports = User