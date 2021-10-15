require("dotenv").config();
const db = require('../../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const authorization = req.headers['authorization'];

  jwt.verify(authorization,process.env.ACCESS_SECRET , async function(err,decoded){
    if(err) {
      res.status(401).json({ message:"not authorized" })
    } else {
      const tokenData = { 
        id: decoded.id,
        email:decoded.email,
        name:decoded.name,
        password:decoded.password
      }

      const userInfo = await db.user.findOne({
        where: tokenData
      })

      if(!userInfo) {
        res.status(404).json({ message:"invalid user"})
      } else {
        const payload = {
          id : userInfo.dataValues.id,
          name : userInfo.dataValues.name,
          email : userInfo.dataValues.email,
          password : userInfo.dataValues.password
        }
        
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "15m"})
        // const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: "1h"})
    
        // res.cookie("refreshToken", refreshToken, {
        //   httpOnly: true,
        //   secure: true,
        //   sameSite: "none"
        // })
    
        res.status(200).json({
          accessToken: accessToken,
          name : userInfo.dataValues.name,
          email : userInfo.dataValues.email,
          password : userInfo.dataValues.password,
          message: "Information passed"
        })
      }
    }
  })
};
