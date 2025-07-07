const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema({
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'member',
        required: true
    },
    movies: {
        type: [{ movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'movie' }, date: Date }],
        required: true
    }
}, { versionKey: false }
)


const Subscription = mongoose.model('subscription', subscriptionSchema);
module.exports = Subscription;