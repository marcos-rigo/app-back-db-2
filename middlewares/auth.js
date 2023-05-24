const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        const {id} = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.id = id;
        next();
    } catch (error) {
        res.status(401).json({message:"Invalid token"})
    }
}

module.exports = auth;