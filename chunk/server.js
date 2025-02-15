const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res)=>{
    //loadash
    const num = _.random(0,20);
    console.log(num);






    res.setHeader('Content-Type', 'text/html');
    let path = './views/';
    switch(req.url){
        case '/':
            path+='index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path+='about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path+='404.html';
            res.statusCode = 404;
            break;
    }

    //set header content type
    

    //send an html file
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
            res.end();
        }else {
            // console.log(data.toString());
            // res.write(data.toString());
            res.end(data)
        }
    })
});

server.listen(3000,'localhost', ()=>{
    console.log('Server is listening for requests on port 3000');
})