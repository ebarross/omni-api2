const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    console.log("ok");
    socker.on('connectRoom', box => {
        socket.join(box);
    });
});

mongoose.connect("mongodb+srv://ebarros:2974825@cluster0-6oiwh.mongodb.net/test?retryWrites=true", { useNewUrlParser: true });

app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(express.json());
app.use(express.urlencoded({ extented: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(proccess.env.POST || 3000);