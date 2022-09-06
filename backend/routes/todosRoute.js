const express = require("express")
const router = express.Router()
const verifyToken = require("../middlewares/verifyToken")
const Todo = require("../models/Todo")

router.get("/me", verifyToken, async (req, res) => {
    try {
        const todos = await Todo.find({ userID : req.user._id })
        res.send(todos)
    } catch ({ message }) { res.status(400).send(message) }
})

router.post("/", verifyToken, async (req, res) => {
    try {
        const todo = new Todo({ ...req.body, userID : req.user._id })
        await todo.save()
        res.status(201).send(todo)
    } catch ({ message }) { res.status(400).send(message) }
})

router.put("/:id", verifyToken, async (req, res) => {
    const query = { userID : req.user._id, _id : req.params.id}
    const { userID, ...updateObj } = req.body//extract the userID
    try {
        const updated = await Todo.findOneAndUpdate(query, updateObj)
        res.send(updated)
    } catch ({ message }) { res.status(404).send(message) }
})

router.delete("/me", verifyToken, async (req, res) => {
    try {
        await Todo.deleteMany({ userID : req.user._id})
        res.status(204).send()
    } catch ({ message }) { res.status(404).send(message) } 
})

router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const result = await Todo.findOneAndRemove({ userID : req.user._id, _id : req.params.id })
        if (!result) throw new Error("Didn't Find Anything With That ID")
        res.status(204).send(result)
    } catch ({ message }) { res.status(404).send(message) }
})



module.exports = router
