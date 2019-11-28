const mongoose = require('mongoose');
const authSchema = require('./model');

authSchema.statics = {
    create: function (data, cb) {
        const user = new this(data)
        user,saved(cb);
    },
    login: function (query, cb) {
        this.find(query, cb);
    }
}

const authModel = mongoose.model('Users', authSchema);
module.exports = authModel;
