// Este é um decorator que recebe uma função  que recebe um handler que vai retornar o handler em um formato de middleware
const asyncErrorHandler = (handler) => (req, res, next) => {
  handler(req, res).catch(next)
}

module.exports = asyncErrorHandler;
