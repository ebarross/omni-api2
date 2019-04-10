

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    console.log("ok");
    socker.on('connectRoom', box => {
        socket.join(box);
    });
});

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
});

app.use(cors());
app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(express.json());
app.use(express.urlencoded({ extented: true }));
app.use(morgan("dev"));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', "uploads")));

app.use(require('./routes'));

server.listen(process.env.PORT || 3000);