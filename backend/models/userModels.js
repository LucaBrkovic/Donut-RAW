// saving information about donutz users 
// mongoSchema

import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true 
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false 
    }

})
// mongoDb makes user baseud on userSchema fill
const User = mongoose.model('User', userSchema)

export default User