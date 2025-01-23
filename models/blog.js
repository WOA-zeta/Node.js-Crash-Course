const mongoose =require('mongoose');
const Schema = mongoose.Schema;//define the structure of the document   //schema is a class

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required:true
    },
    body:{
        type: String,
        required:true
    }
},{timestamps:true})

const Blog = mongoose.model('Blog', blogSchema);//model is a function that takes two arguments, the name of the collection and the schema of the collection
module.exports = Blog;