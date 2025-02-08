require('dotenv').config()
const express = require('express')

const WebSocket = require('ws');
const http = require('http')



const app = express();
const PORT = process.env.PORT || 8080;


const server = http.createServer(app);

const wss = new WebSocket.Server({ server });


let clients = new Set();



wss.on('connection' , (ws) => {
    console.log('New Client connected');
    clients.add(ws);



ws.on('message' , (message) => {
    console.log(`Received ${message}`)


    clients.forEach(client => {
        if(client.readyState === WebSocket.OPEN) {
            client.send(message.toString())
        }
    })
})


ws.on('close' , ()=> {
    console.log('client disconnected')
    clients.delete(ws);

})
})


server.listen(PORT , () => {
    console.log(`BroadCast Server Runnnning on ws://localhost:${PORT}`)


    
})