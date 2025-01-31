const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();

router.get('/',(req,res)=>{
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('index', {title: 'All Blogs', blogs: result});
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.post('/', (req,res)=>{//received post request from teh form and trigger this function which then saves the data to the database
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

router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect:'/blogs'})
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.get('/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then((result)=>{
        res.render('details', {title:"testing", blog:result})
    })
    .catch((err)=>{
        console.log(err);
    })
})


router.get('/create',(req,res)=>{
    res.render('create', {title: 'Create'});
})

router.get('/single-blog',(req,res)=>{
    Blog.findById()
})

router.get('/add-blog',(req,res)=>{
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

router.get('/all-blogs',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result);
    })
})

module.export = router //export the router object to be used in the app.js file