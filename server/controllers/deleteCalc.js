const mongoose = require('mongoose');

const User = mongoose.model('user');
const Calculator = mongoose.model('calculator');

module.exports = async function deleteCalc(req, res, next) {
  console.log('req.baseUrl', req.baseUrl);
  try {
    const userById = await User.findById({ id: req.params.userid });
    if (userById) {
      res.status(400);
      return res.json({ message: 'User with such id does not exists' });
    }
    const delCalc = await Calculator.findByIdAndRemove(req.params.calcid);
    console.log('!!!->then findByIdAndRemove calc=', delCalc);
    const calcs = await Calculator.find({ author: req.params.userid });
    const calcsToFront = calcs.map(calc => calc.toJSON());
    return res.status(200).json(calcsToFront);
  } catch (error) {
    return next(error);
  }
};
