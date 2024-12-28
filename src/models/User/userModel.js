import mongoose from "mongoose";
import validator from "validator";

let userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'The username is required'],
    },
    password: {
        type: String,
        required: [true, 'Enter a strong password'],
        validate: {
            validator: function (value) {
                return validator.isStrongPassword(value);
            },
            message: "Password must be strong enough",
        },
    },
    email: {
        type: String,
        required: [true, 'Enter proper email'],
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: "Enter a valid email",
        },
        unique: true,
    },
    Notes: {
        type: [String],
        default: [],
    },
});

// Use existing model or create a new one
const User = mongoose.models.usermodel || mongoose.model('usermodel', userSchema);

export default User;
