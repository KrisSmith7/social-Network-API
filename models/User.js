//username
//email
// thoughts - array of _id values ref thought model
// friends - array of _id values ref user model (self reference)
const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: 'A username is required.'
        },
        
        email: {
            type: String,
            required: 'A valid email is required.',
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    
    {
        toJSON: {virtuals:true},
        id: false
    }
    );
    
    
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
    UserSchema.virtual('friendCount').get(function() {
        return this.friends.length;
    });

const User = model('User', UserSchema);

module.exports = User;
