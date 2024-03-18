const Joi = require("joi");

module.exports = Joi.object({
  make: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.number().required(),
  price: Joi.number().required(),
  mileage: Joi.number().optional(),
  color: Joi.string().optional(),
  transmission: Joi.string().optional(),
  description: Joi.string().optional(),
  license: Joi.string().optional(),
  images: Joi.array().items(Joi.string()).optional(),
  features: Joi.array().items(Joi.string()).optional(),
  showroomID: Joi.string().hex().length(24).optional(),
  owner: Joi.string().hex().length(24).optional(),
});
