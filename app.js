const path = require('path');

const mongoose = require('mongoose');

const express = require("express");
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const splash = require("./routes/api/splash");
const users = require("./routes/api/users");
const games = require("./routes/api/games");


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
    next();
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

// app.get("/", (req, res) => res.send("Hello World"));
app.use("/", splash);
app.use("/api/users", users);
app.use("/api/games", games);

const port = process.env.PORT || 5000;

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.join("should be game id");
    socket.on("join", (data)=>{
        socket.to("should be game id").emit("someoneJoined", data)

    })

    socket.on("sendingMessage", (data) => {
        socket.to("should be game id").emit("receiveMessage", data)

    })

    socket.on("sendingMove", (data) => {
        socket.to("should be game id").emit("receiveMove", data)

    })

    socket.on("joinGame", (data) => {
        socket.to("should be game id").emit("joinGame", data)

    })

    socket.on("indexPage", data => {
        socket.to("should be game id").emit("reloadIdxPage", data)

    })

    // socket.on("start", (data) => {
    //     socket.to("should be game id").emit("start", data)
    // })
});

http.listen(port, () => console.log(`Server is running on port ${port}`));