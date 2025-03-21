const mongoose = require("mongoose");

require("dotenv").config()



const UserSchema = new mongoose.Schema({

    email: {

        type: String,

        unique: true,

        required: "Your email is required",

        trim: true

    },

    username: {

        type: String,

        required: "Your username is required"

    },

    password: {

        type: String,

        required: "Your password is required",

        max: 100
    },

    firstName: {

        type: String,

        required: "First Name is required",


        max: 100
    },

    lastName: {

        type: String,

        required: "Last Name is required",

        max: 100

    },
    
    timeOptCreate :{
        type: String,
    },
    timeOptExpired :{

        type: String,

    },


}, 

{timestamps: true});

module.exports = mongoose.model("Users", UserSchema);