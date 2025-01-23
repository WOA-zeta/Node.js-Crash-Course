const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();

const dbURI = 'mongodb+srv://zeta:zeta1234@nodetuts.rigzm.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts';
mongoose.connect(dbURI,    { useNewUrlParser: true, useUnifiedTopology: true })
.then((result)=> app.listen(3000))
.catch((err)=> console.log(err));

//register view engine
app.set('view engine','ejs');
//listen for request


//middleware & static files
app.use(express.static('public'));

app.use(morgan('dev'));

//mongoose and mongo sandbox routes
app.get('/add-blog',(req,res)=>{
    const blog = new Blog()
})

app.get('/',(req,res)=>{
    // res.send('<p>home page</p>');
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'}
    ];
    res.render('index', {title: 'Home', blogs:blogs});
});

app.get('/about',(req,res)=>{
    
    // res.send('<p>home page</p>');
    res.render('about', {title: 'About'});

});

app.get('/blogs/create',(req,res)=>{
    res.render('create', {title: 'Create'});
})

app.use((req,res)=>{
    res.status(404).render('404', {title: 'Error'})//res.satus(404) will return the res object with status 404 so that we can chain the sendFile method
})