const ms = require("ms")

module.exports = function (numMS=1) {
    return function delay (req, res, next) {
        setTimeout(next, ms(`${numMS}s`))
    }
}