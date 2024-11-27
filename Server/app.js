if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000;
const router = require('./routes');

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use(router)

app.listen(PORT, () => {
    console.log("Ini masuk")
})

module.exports = app