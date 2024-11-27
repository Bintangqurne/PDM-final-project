const { cekToken } = require('../helpers/jwt');
const { User } = require('../models')


const authentication = async (req, res, next) => {
    console.log(req.headers);
    try {
        let access_token = req.headers.authorization
        // console.log(access_token);
        if (!access_token) {
            throw { name : "Unauthenticated"}
        }
        
        access_token = access_token.split(' ')[1]
        const verified = cekToken(access_token)
        const userFound = await User.findByPk(verified.id)
        
        if (!userFound) {
            throw { name : "Unauthenticated"}
        }
        
        req.user = {
            id: userFound.id,
            email: userFound.email,
            role: userFound.role
        }

        next();
    } catch (error) {
        // console.log(error, '<<<');
        if (error.name === "Unauthenticated" || error.name === 'JsonWebTokenError') {
            res.status(401).json({
                message: "Please First Login"
            })
        } else {
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
}

module.exports = authentication