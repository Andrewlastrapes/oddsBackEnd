const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = function (req, res, next) {

    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
     try {
        const decoded = jwt.verify(token, config.secret);
        req.user = decoded.user
        next()
    } catch {
        res.status(401).json({
            message: "Unauthorized"
        })
    }


}