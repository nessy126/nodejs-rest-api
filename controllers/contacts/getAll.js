const { Contact} = require('../../models/Contact')

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const {
    page = 1, limit = 3, favorite
  } = req.query;
  const skip = (page - 1) * limit;  

  if ( favorite === "true") {
    const result = await Contact.find({
        owner,
        favorite 
    }
    ,
      "-createdAt -updatedAt", {
        skip,
        limit: Number(limit)
    }
    )
      .populate("owner", "email")
    res.json(result)
  } else {
    const result = await Contact.find({
        owner,
      }, "-__v -createdAt -updatedAt", {
        skip,
        limit: Number(limit)
      })
      .populate("owner", "email")
    res.json(result)
  }
}

module.exports = getAll