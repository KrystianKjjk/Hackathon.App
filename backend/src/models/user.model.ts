import * as mongoose from 'mongoose';
const jwt = require('jsonwebtoken');
import 'dotenv/config';
import * as Joi from 'joi';

export interface IUser extends mongoose.Document{
    name: String,
    email: String,
    password: String,
    isAdmin: boolean,
    generateAuthToken: () => string
}


const userSchema = new mongoose.Schema<IUser>({
    // _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true,
        minLength: 2, 
        maxLength: 50,
        match: [/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,50}$/, 'Pole imię musi zawierać tylko litery']
    },
    email: { 
        type: String, 
        minLength: 5,
        maxLength: 255,
        required: true,
        unique: true,
        match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, 'Podano nieprawidłowy adres email']
    },
    password: { 
        type: String, 
        required: true,
        minLength: 8,
        maxLength: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

//index wildcard allow to dynamic search
userSchema.index({ '$**': 'text' });

//adding a method to userSchema for generating jwt token
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({
        _id: this._id,
        email: this.email,
        isAdmin: this.isAdmin
    },
    process.env.JWT_PRIVATE_KEY,
    {
        expiresIn: process.env.JWT_TOKEN_EXPIRESIN
    });
    return token;
}

const User = mongoose.model<IUser & mongoose.Document>('User', userSchema);

const newUserSchema = Joi.object({
    name: Joi.string().min(2).max(50).regex(/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,50}$/).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(255).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z<>!@#$%^&*?_=+-]{8,}$/).required(),
    isAdmin: Joi.boolean()
});

const updateUserSchema = Joi.object({
    name: Joi.string().min(2).max(50).regex(/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,50}$/),
    email: Joi.string().min(5).max(255).email(),
    password: Joi.string().min(8).max(255).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z<>!@#$%^&*?_=+-]{8,}$/),
    isAdmin: Joi.boolean()
});

export { User,  newUserSchema as validateUser, updateUserSchema as validatePatchUpdate }
// exports.User = User;
// exports.validateUser = newUserSchema;
// exports.validatePatchUpdate = updateUserSchema;