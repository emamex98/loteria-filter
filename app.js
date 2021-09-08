//Require module
const { response } = require("express");
const express = require("express");
const path = require('path');

let count = 30;
let max = -1;
let sessionID = ""

// Express Initialize
const app = express();
const port = 8000;
app.listen(port, () => {
    console.log("listen port 8000");
});

app.get("/", (req, res) => {
    // res.send(JSON.stringify(response));
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get("/entrar", (req, res) => {
    console.log(count);
    if (count <= max) {
        res.redirect("https://mfbc.us/m/" + sessionID + "/" + count);
    } else {
        res.sendFile(path.join(__dirname, '/index.html'));
    }
    count++;
});

// localhost:8000/reset?max=30&session=abc123

app.get("/reset", (req, res) => {

    sessionID = req.query.session;
    max = req.query.max;
    count = 0;

    const response = {
        message: "Success",
        gameURL: "https://mfbc.us/m/" + sessionID,
        maxPlayers: max
    }

    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(response));
});
