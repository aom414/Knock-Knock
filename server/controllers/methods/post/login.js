require("dotenv").config();
const db = require('../../../models');
const jwt = require('jsonwebtoken');


module.exports = async (req, res) => {

    const userInfo = await db.user.findOne({
      where: { email: req.body.email, password: req.body.password }
    })

    if(!userInfo) {
      res.status(404).json({ message:"invalid email or password" })
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
      data: {
        payload:payload,
        accessToken: accessToken
    },
      message: "Information passed"
    })
  }
}