function asyncMiddleware(handle) {
  return async (req, res, next) => {
    try {
      await handle(req, res);
    } catch (error) {
      console.log("Error", error.message);
      res.send(error.message);
    }
  };
}

module.exports = asyncMiddleware;
