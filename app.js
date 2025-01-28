const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose');
const Blog = require('./models/blog');

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
app.get('/add-blog',(req,res)=>{
    const blog = new Blog({
        title: 'another new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });
    blog.save()
        .then((result)=>{
            res.send(result)
        })        .catch((err)=>{
            console.log(err);
        })
})

app.get('/',(req,res)=>{
    // res.send('<p>home page</p>');
    res.redirect('/blogs');
});

app.get('/all-blogs',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result);
    })
})

app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('index', {title: 'All Blogs', blogs: result});
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.delete('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect:'/blogs'})
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then((result)=>{
        res.render('details', {title:"testing", blog:result})
    })
    .catch((err)=>{
        console.log(err);
    })
})





app.get('/single-blog',(req,res)=>{
    Blog.findById()
})

app.get('/about',(req,res)=>{
    
    // res.send('<p>home page</p>');
    res.render('about', {title: 'About'});

});

app.post('/blogs', (req,res)=>{//received post request from teh form and trigger this function which then saves the data to the database
    const blog = new Blog(
        req.body
    );
    blog.save()
        .then((result)=>{
            res.redirect('/blogs');
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.get('/blogs/create',(req,res)=>{
    res.render('create', {title: 'Create'});
})

app.use((req,res)=>{
    res.status(404).render('404', {title: 'Error'})//res.satus(404) will return the res object with status 404 so that we can chain the sendFile method
})