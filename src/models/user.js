const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: true,

    },
    password:{
        type : String,
        required:true,
    }
})

// If we use arrow function "this" is not accessible
userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
// it will look up for *"users"* collections
const User = mongoose.model('User', userSchema);
module.exports = User;