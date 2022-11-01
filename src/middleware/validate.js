const Joi = require("joi");
const { ValidationError } = require("../errors");

const validate = ({
  body: bodySchema = Joi.any(),
  params: paramsSchema = Joi.any(),
  query: querySchema = Joi.any()
}) => (req, _res, next) => {
  const schema = Joi.object({
    body: bodySchema,
    params: paramsSchema,
    query: querySchema
  })

  const { body, params, query } = req;
  const { error } = schema.validate({ body, params, query }, { abortEarly: false }) //abortEarly: false -> continua se encontrar um erro
  if (!error) {
    return next();
  }
  next(new ValidationError({ validations: error.details }))
}

module.exports = validate;
