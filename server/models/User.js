const {Schema, model} = require('mongoose');
const encryption = require('../util/encryption');

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    hashedPass: { type: String, required: true },
    salt: { type: String, required: true },
    roles: [{ type: String, default: 'User'}],
    questions: [{type: Schema.Types.ObjectId, ref: 'Question'}],
    answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
    banned: {type: Boolean, default: 'false'}
});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    }
});

const User = model('User', userSchema);

User.seedAdminUser = async () => {
    try {
        let users = await User.find();
        if (users.length > 0) return;
        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, '123');
        return User.create({
            username: 'admin',
            salt,
            hashedPass,
            roles: ['Admin']
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = User;
