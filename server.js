//to import express
const express=require('express');
const app=express();

//for require http and createServer is used to create a http server
const http=require('http').createServer(app);

const PORT=process.env.PORT || 3000;

// listen creates a listener on specific port 
http.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})

//middleware - it enables communication and data management for distribue=ted application
app.use(express.static(__dirname+'/public'))

// send() basically sends the http response
//snedFile basicaaly transfers the file at a given path
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/chatting.html')
})

//socket

//import socket
const io=require('socket.io')(http);


io.on('connection', (socket) => {
    console.log('Connected...');

    //broadcast meaning sending an event to all the clients
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg);
    })

})