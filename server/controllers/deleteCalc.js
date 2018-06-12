const mongoose = require('mongoose');

const Calculator = mongoose.model('calculator');

module.exports = async function deleteCalc(req, res, next) {
  try {
    if (req.params.userid !== req.user.id) { // request may do only user or admin
      res.status(403);
      return res.json({ message: 'Please, login again' });
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
