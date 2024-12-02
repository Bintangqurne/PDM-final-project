const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || "rahasia"

const createToken = (payload) => jwt.sign(payload, SECRET);
function cekToken(token){
    return jwt.verify(token, SECRET)
}

module.exports = {createToken, cekToken};
