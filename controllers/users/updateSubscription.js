const { User } = require("../../models/User");

const updateSubscription = async (req, res) => {
  console.log("updateSubscription");
  const { _id: id } = req.user;

  const result =  await User.findByIdAndUpdate(id, req.body, {
    new: true
  })
console.log(result.subscription);
  res.json(result.subscription)
}


module.exports = updateSubscription;