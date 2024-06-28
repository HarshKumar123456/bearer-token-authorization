import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            default: uuidv4,
        }
    },
    { timestamps: true },
);

const User = mongoose.model("USER", userSchema);

export default User;