const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genres: {
        type: [String],
        required: true
    },
 image:{type: String, required: true},
 premiered: {type: Date, required: true},
},   { versionKey: false }
)


const Movie = mongoose.model('movie', movieSchema);
module.exports = Movie;