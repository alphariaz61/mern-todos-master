console.clear()
const express = require("express")
const app = express()
require("colors")
require("dotenv").config({ path : "backend/config.env" })
const connectDB = require("./scripts/database")
const User = require("./models/User")

app.use(express.json())

app.use("/api/users", require("./routes/usersRoute"))
app.use("/api/todos", require("./routes/todosRoute"))


app.listen(5000, () => {
    console.log("Server Started....".cyan.bold.underline)
    connectDB()
})
// 