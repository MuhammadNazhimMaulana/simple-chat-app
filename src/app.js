const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

// FS
const { writeFile } = require("fs");

// App Config
const app = express();

// Extra For Socket,io
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Env
require('dotenv').config()

// Setup ejs
app.set('view engine', 'ejs');

// Set views folder
app.set('views', path.join(__dirname, '../src/views'));

// Menggunakan ejs-layouts (Third party Middleware)
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));

// Socket Io Conenction
io.on('connection', (socket) => {

    // When message is sent
    socket.on('incoming chat', (msg) => {
        io.emit('incoming chat', msg);
    });
    
    //listen on typing
    socket.on('typing', () => {
        io.emit('typing', 'Seseorang sedang mengetik');
    })

    //When Someone Disconnect
    socket.on('disconnect', () => {
        io.emit('offline', 'Someone is offline');
    });

    // On Upload
    socket.on("upload", (file, callback) => {
   
        // save the content to the disk, for example
        writeFile("src/public/uploads/test.txt", file, (err) => {
          callback({ message: err ? 'failure' : "success" });
        });
    });
});

// Seperate Route
const route = require('./routes/simple.route.js');
app.use('/test', route);

// Port
const port = process.env.PORT;
server.listen(port, () => {
    console.log(`Jalan di http://localhost:${port}`);
});