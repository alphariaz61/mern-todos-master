const { model, Schema, SchemaTypes } = require("mongoose")

module.exports = model("Todo", new Schema({
    userID : {
        type : SchemaTypes.ObjectId,
        required : [true, "ObjectId Is Required"] 
    },
    text : {
        type : String,
        required : [true, "Text Is Required"] 
    },
    isComplete : {
        type : Boolean,
        required : [true, "isComplete Is Required"] 
    }
}))