require("./db/conn")
const { log } = require("console");
const { Socket } = require("dgram");
const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT
const {createServer} = require("http");

const chatmodel = require("./db/chatschema");

const { Server } = require("socket.io");
const server = createServer(app);

const io = new Server(server);

app.use(express.static("./public"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
app.get("/aboutus",(req,res)=>{
    res.sendFile(__dirname+"/aboutus.html")
})



async function insertintodb(msg){
    let doc = await chatmodel.findOne() || new chatmodel();
    doc.items.push(msg);
    await doc.save();
    console.log(doc);
}

io.on("connection",async(socket)=>{
    console.log("a user connceted");
    socket.on("disconnect",()=>{
        console.log('user disconnected');
    });
    socket.on("message",async(msg)=>{
     socket.broadcast.emit("message",msg);
     insertintodb(msg)
    })
});


server.listen(PORT,()=>console.log("listning to port",PORT))