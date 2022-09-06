console.clear()
const express = require("express")
const app = express()
require("colors")
require("dotenv").config({ path : "backend/config.env" })
const connectDB = require("./scripts/database")

// jsoon body parser
app.use(express.json())

// Routes
app.use("/api/users", require("./routes/usersRoute"))
app.use("/api/todos", require("./routes/todosRoute"))

// serve frontend folder
app.use(express.static("client/build"))
app.get("*", (_, res) => res.sendFile(__dirname.replace("/backend", "") + "/client/build/index.html"))

// Start Server
app.listen(5000, () => {
    console.log("Server Started....".cyan.bold.underline)
    connectDB()
})
