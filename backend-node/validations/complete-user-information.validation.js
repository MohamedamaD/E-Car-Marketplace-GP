const Joi = require("joi");
const dataSchema = Joi.object({
  phoneNumber: Joi.string()
    // .pattern(/^[0-9]{11}$/)
    .required(),
  street: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  role: Joi.string().required(),
});

module.exports = function (req, res, next) {
  try {
    console.log(req.body);
    const { error, value } = dataSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  } catch (error) {
    return res.status(400).json({ error });
  }
};
