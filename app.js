const express = require('express')


const app = express();

//register view engine
app.set('view engine','ejs');

//listen for request
app.listen(3000);

app.get('/',(req,res)=>{
    // res.send('<p>home page</p>');
    res.render('index', {title: 'Home'});
});

app.get('/about',(req,res)=>{
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'}
    ];
    // res.send('<p>home page</p>');
    res.render('about', {title: 'About', blogs});

});

app.get('/blogs/create',(req,res)=>{
    res.render('create', {title: 'Create'});
})

app.use((req,res)=>{
    res.status(404).render('404', {title: 'Error'})//res.satus(404) will return the res object with status 404 so that we can chain the sendFile method
})