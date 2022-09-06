const jwt = require("jsonwebtoken")

module.exports = function createToken (payload, expiresIn="30d") {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn })
}