const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  locations: Joi.array().items(
    Joi.object({
      name: Joi.string(),
      phone: Joi.string(),
      address: Joi.string(),
    })
  ),
  image: Joi.string(),
  userID: Joi.string().required(),
});
