const mongoose = require('mongoose');

const Calculator = mongoose.model('calculator');

module.exports = async function createCalculator(req, res, next) {
  console.log('!!!->createCalculator req.body=', req.body);
  console.log('!!!->createCalculator req.params.userid=', req.params.userid);
  console.log('!!!->createCalculator req.user.id=', req.user.id);
  try {
    if (req.params.userid !== req.user.id) { // request may do only user or admin
      res.status(403);
      return res.json({ message: 'Please, login again' });
    }
    const newCalc = new Calculator({
      author: req.params.userid,
      name: req.body.name,
      formula: req.body.formula,
      settings: req.body.settings,
      isTemplate: req.body.isTemplate,
    });
    console.log('!!!->newCalc save=', newCalc);
    await newCalc.save();
    console.log('!!!->newCalc saved');
    const calcs = await Calculator.find({ author: req.params.userid });
    const calcsToFront = calcs.map(calc => calc.toJSON());
    return res.status(200).json(calcsToFront);
  } catch (error) {
    return next(error);
  }
};
