const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
        },
    email: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true
    }
},
  { versionKey: false }
);
const Member = mongoose.model('member', memberSchema);
module.exports = Member;