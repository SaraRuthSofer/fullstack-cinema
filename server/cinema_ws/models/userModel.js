const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
        },
    password: {
        type: String,
        required: true
    }

},
  { versionKey: false }
);
const User = mongoose.model('user', userSchema);
module.exports = User;