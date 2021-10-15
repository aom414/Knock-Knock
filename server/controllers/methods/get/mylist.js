require("dotenv").config();
const db = require('../../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  
  const authorization = req.headers['authorization'];

  jwt.verify(authorization,process.env.ACCESS_SECRET , async function(err,decoded){
    if(err) {
      res.status(401).json({ message:"not authorized"} )
    } else {
      
      const tokenData = { 
        id: decoded.id,
        email:decoded.email,
        name:decoded.name,
        password:decoded.password
      }
  
      const userData = await db.user.findOne({
        where: tokenData
      })
      if(!userData) {
        res.status(404).json({ message:"invalid user"})
      } else {
        
        const myComment = await db.comment.findAll({
          where: { user_id: Number(tokenData.id) }
        })

        const myToilet = await db.toilet.findAll({
          where: { user_id: Number(tokenData.id) }
        })

        res.status(200).json({
          myComment:myComment,
          myToilet: myToilet,

          message: "Information passed" 
        })
      }
    }
  }) 
}