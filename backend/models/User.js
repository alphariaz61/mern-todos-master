const { model, Schema } = require("mongoose")

module.exports = model("User",  new Schema({
    email : { 
        type : String, 
        unique : true, 
        required : [true, "Email Is Required"] 
    },
    password : { 
        type : String,
        required : [true, "Password Is Required"],
        minLength : [5, "Password is too short"]
    }
}))