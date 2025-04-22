//requires
const db = require("./config/connection");
const express = require('express');
const routes = require("./routes");

//port
const app = express();
const port = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

//db
db.once("open", () => {
    console.log("started");
    app.listen(port, () => {
        console.log(`Server is running on ${port}!`);
        console.log(port);
    });
});

// app.listen(3001);

//complete