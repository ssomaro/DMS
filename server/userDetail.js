const mongoose = require("mongoose")

const userDeatilsSchema = new mongoose.Schema(
    {
        fname: String,
        lname:String,
        email:{type: String, unique: true},
        password:String
    },
    {
        collection: "UserDetailsCollection"
    }
);

mongoose.model("UserDetails", userDeatilsSchema);