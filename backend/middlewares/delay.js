const ms = require("ms")

module.exports = function delay (req, res, next) {
    setTimeout(next, ms('2s'))
}