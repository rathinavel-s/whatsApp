const express =require('express')
const app = express()
const http =require('http')
const cors = require('cors')
const {Server} = require("socket.io")

app.use(cors())

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
  console.log(socket.id)
   
  socket.on("join_room",(data)=>{
      socket.join(data)
      console.log(`connected with ID: ${socket.id} joined room: ${data}`)
  })

  socket.on("send_message",(data)=>{
    socket.to(data.room).emit("receive_message",data)
  })

  socket.on("disconnected",()=>{
    console.log("User disconnected",socket.id)
  })
})

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
