const express = require('express');
const blogController = require('../controller/blogController');
const router = express.Router();



router.get('/blogs',blogController.blog_index);//get request to the /blogs route and trigger the blog_index function in the blogController

router.post('/blogs', (req,res)=>{//received post request from teh form and trigger this function which then saves the data to the database
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



router.get('/blogs/create',(req,res)=>{
    res.render('create', {title: 'Create'});
})


router.get('/blogs/add-blog',blogController.blog_create);//get request to the /blogs/add-blog route and trigger the blog_create_get function in the blogController

router.get('/blogs/all-blogs',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result);
    })
})

router.get('/blog/:id/create',(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then((result)=>{
        res.render('details', {title:"testing", blog:result})
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.delete('/blog/:id/delete',(req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect:'/blogs'})
    })
    .catch((err)=>{
        console.log(err);
    })
})



module.exports = router //export the router object to be used in the app.js file