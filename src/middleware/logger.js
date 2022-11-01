const loggerReq = (log = console.log) => (req, res, next) => {
  log({
    url: req.url,
    method: req.method,
    headers: req.headers,
  });

  next();
}

module.exports = loggerReq;
