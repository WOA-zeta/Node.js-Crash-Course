const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose');
const blogRoute = require('./routes/blogRoute')

const app = express();

const dbURI = 'mongodb+srv://zeta:zeta1234@nodetuts.rigzm.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts';//make it a secret using environment variables in the waht is called a .env file and require dotenv package
mongoose.connect(dbURI)
.then((result)=> app.listen(3000))
.catch((err)=> console.log(err));

//register view engine
app.set('view engine','ejs');
//listen for request


//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));//this middleware will parse the form data and add it to the request object//allow the use of req.body
app.use(morgan('dev'));
//mongoose and mongo sandbox routes
app.get('/',(req,res)=>{
    // res.send('<p>home page</p>');
    res.redirect('/blogs');
});

app.get('/about',(req,res)=>{
    
    // res.send('<p>home page</p>');
    res.render('about', {title: 'About'});

});

app.use(blogRoute)


app.use((req,res)=>{
    res.status(404).render('404', {title: 'Error'})//res.satus(404) will return the res object with status 404 so that we can chain the sendFile method
})