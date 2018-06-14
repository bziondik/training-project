const mongoose = require('mongoose');

const Calculator = mongoose.model('calculator');

module.exports = async function updateCalc(req, res, next) {
  try {
    // request may do only user or admin
    if (req.params.userid !== req.user.id && !req.user.isAdmin) {
      res.status(403);
      return res.json({ message: 'Please, login again' });
    }
    const calcCurrent = await Calculator.findById(req.params.calcid);
    console.log('!!!->then findById calcCurrent=', calcCurrent);

    calcCurrent.name = req.body.name || calcCurrent.name;
    calcCurrent.settings = req.body.settings || calcCurrent.settings;
    calcCurrent.formula = req.body.formula || calcCurrent.formula;

    const savedCalc = await calcCurrent.save();
    console.log('!!!->then save savedCalc=', savedCalc);
    return res.status(200).json(savedCalc.toJSON());
  } catch (error) {
    return next(error);
  }
};
