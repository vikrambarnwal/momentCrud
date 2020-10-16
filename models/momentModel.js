var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
const db = require('../middlewears/mangooes')

const momentSchema = new Mongoose.Schema({
    comment: {
        type: String
    },
    tags: {
        type: String
    },
    imageUrl: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = db.mainDb.model('moment', momentSchema)