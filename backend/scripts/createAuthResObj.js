const createToken = require("./createToken")

module.exports = function createResObject ({_id, email}) {
    return ({ token : createToken({ _id }), email})

}