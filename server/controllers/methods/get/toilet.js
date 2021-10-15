const { Op } = require("sequelize");
const db = require('../../../models');

module.exports = async (req, res) => {

  let minX = req.query.boudaryX.split('-')[0]
  let maxX = req.query.boudaryX.split('-')[1]
  let minY = req.query.boudaryY.split('-')[0]
  let maxY = req.query.boudaryY.split('-')[1]
  
  const toiletInfo = await db.toilet.findAll({
    where: {
      [Op.and]: [{locationY: {
        [Op.and]: [{[Op.gt]: minY},{[Op.lt]: maxY}]
      }},{locationX: {
        [Op.and]: [{[Op.gt]: minX},{[Op.lt]: maxX}]
      }}]
    }
  })
    
  res.status(200).json(toiletInfo)
}