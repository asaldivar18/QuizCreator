const express = require('express')
const app = express()
const path = require("path");
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const quizzes = require("./routes/api/quizzes")

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    useNewUrlParser: true
}));
app.use(express.static(__dirname + '/Public'));

//DB CONFIG
const db = require('./config/keys').mongoURI
    //Connect to mongo
mongoose.connect(db)
    .then(() => {
        console.log("connected")
    }).catch(err => {
        console.log(err)
    })

//
app.use('/api/quizzes', quizzes)

const port = process.env.PORT || 3000

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/Public/index.html"));
});
app.listen(port, () => console.log(' Server started listening on port ' + port))