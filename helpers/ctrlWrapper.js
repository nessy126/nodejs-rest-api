const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      // console.log("object");
      await ctrl(req, res, next);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  return func;
}
module.exports = ctrlWrapper;