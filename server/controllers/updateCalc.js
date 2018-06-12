const mongoose = require('mongoose');

const User = mongoose.model('user');
const Calculator = mongoose.model('calculator');

module.exports = async function updateCalc(req, res, next) {
  try {
    const userById = await User.findById({ id: req.params.userid });
    if (userById) {
      res.status(400);
      return res.json({ message: 'User with such id does not exists' });
    }
    const calcCurrent = await Calculator.findById(req.params.id);
    console.log('!!!->then findById calcCurrent=', calcCurrent);

    calcCurrent.name = req.body.name || calcCurrent.name;
    calcCurrent.settings = req.body.settings || calcCurrent.settings;
    calcCurrent.formula = req.body.formula || calcCurrent.formula;

    const savedCalc = await calcCurrent.save();
    console.log('!!!->then save savedCalc=', savedCalc);
    const calcs = await Calculator.find({ author: req.params.userid });
    const calcsToFront = calcs.map(calc => calc.toJSON());
    return res.status(200).json(calcsToFront);
  } catch (error) {
    return next(error);
  }
};
