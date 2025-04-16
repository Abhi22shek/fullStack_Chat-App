import {Server} from 'socket.io'
import http from 'http'
import express from 'express' 

const app = express()
const server = http.createServer(app)
const io = new Server(server,{
    cors:{origin:["http://localhost:5173"],
    credentials:true}
})

const onlineUsers = new Set();

io.on("connection" ,(socket) => {
    console.log(" A user  connected" ,socket.id)

    socket.on("setup", (userId) => {
        socket.join(userId);
        socket.userId = userId;

        onlineUsers.add(userId);

        io.emit("onlineUsers", Array.from(onlineUsers));

        socket.emit("connected")
        console.log("User connected",socket.id)
    });

    socket.on("new message",(message) => {
        const receiverId = message.receiverId;
        if(receiverId){
            io.to(message.receiverId).emit("message received", message);
            console.log(`Message sent to ${receiverId}:`, message);
            // Fixed typo: "message recived" -> "message received"
        }
    })
    
    socket.on("disconnect" , () => {
        console.log("User disconnected",socket.id)
    
        if(socket.userId){
            onlineUsers.delete(socket.userId)
            io.emit("onlineUsers", Array.from(onlineUsers))
            console.log(`User ${socket.userId} disconnected`)
        }
    })
})




export {io,server,app}

