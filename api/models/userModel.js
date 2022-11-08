import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please add a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
    },
    photo:{
        type: String,
        default: "no-photo.jpg"
    },
    phone: {
        type: Number,
        default: +234
    },
    bio: {
        type: String,
        default: "My Bio",
        maxLength: [250, "Bio must not be more than 250 characters"]
    }
},{
    timestamps: true,

}
)

const UserModel = mongoose.model('User', userSchema)