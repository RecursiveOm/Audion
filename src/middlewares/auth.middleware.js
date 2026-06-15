const jwt = require("jsonwebtoken");
const albumModel = require("../models/album.model");

async function authArtist(req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(decoded.role!=="artist"){
            return res.status(403).json({
                message:"you dont have the access"
            })
        }
        req.user = decoded;
        next();
    }catch(err){
    return res.status(401).json({
        message:"Unauthorized"
    })}
}

async function authUser(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.role !== "user" &&
 decoded.role !== "artist" ){
            return res.status(404).json({
                message:"Please log-in to keep stream"
            })
        }
        req.user = decoded;
        next()

    }catch(err){
        return res.status(400).json({
            message:"Unauthorized"
        })
    }
}


module.exports = {authArtist, authUser}