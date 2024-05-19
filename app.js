require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes")

// express app
const app = express();

// parses data
app.use(express.urlencoded({extended: true}));

// static files
app.use(express.static('public'));

// connecting to MongoDB
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL)              // -----> mongoose connect is a async function
    .then((result) => {
        // listen for requests
        app.listen(3000);
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log("error");
    })

app.set('view engine', 'ejs')

// Routes
app.get('/', (req, res) => {
    res.redirect('./blogs');
})

app.use('/blogs', blogRoutes);

app.get('/about-us', (req, res) => {
    res.render('blogs/about', {title: 'About'});
})

app.use((req, res) => {
    res.render('blogs/404', {title: '404'});
})

 