import express from "express"
const app = express();
const port = 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// app.use("/", (req ,res) => {
//     res.send("Hello i am server and runing on the port 3000");
// })


// defining the routes

import routes from "./src/routes/taskRoutes.js"

app.use("/api/v1", routes);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



export default app;
// module.exports = app;