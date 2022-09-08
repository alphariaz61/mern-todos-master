console.clear()
const express = require("express")
const app = express()
require("colors")
require("dotenv").config({ path : "backend/config.env" })
const connectDB = require("./scripts/database")
const setStatic = require("./scripts/setStatic")
const delay = require("./middlewares/delay")

// Middleware
app.use(express.json())
// app.use(delay)

// Routes
app.use("/api/users", require("./routes/usersRoute"))
app.use("/api/todos", require("./routes/todosRoute"))

// Server Client App
setStatic(app, express)

// Start Server
app.listen(process.env.PORT || 5000, () => {
    console.log("Server Started".cyan.bold.underline)
    connectDB()
})
