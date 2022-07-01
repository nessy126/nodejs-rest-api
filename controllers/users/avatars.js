const fs = require('fs/promises')
const path = require('path');
const { User } = require('../../models/User');
const avatarsDir = path.join(__dirname, "../../", "public", "avatars")
const Jimp = require('jimp');

const avatars =  async (req, res) => {
  try {
    const { _id: id } = req.user;
    const { filename } = req.file;
    const [extension] = filename.split(".").reverse()
    const name = `${id}.${extension}`;
    const newDir = path.join(avatarsDir, name)
    await fs.rename(req.file.path, newDir)

    Jimp.read(newDir)
      .then(ava => {
        return ava
          .resize(250, 250) // resize
          .write(newDir); // save
      })
      .catch(err => {
        console.error(err);
      });

    const avatarURL = path.join("avatars", name)
    const result = await User.findByIdAndUpdate(req.user._id, {avatarURL}, {new: true})
    
    res.json({
      avatarURL: result.avatarURL
    })
  } catch (error) {
    if (error.message === "not such file") {
      await fs.unlink(req.file.path)
    }
    throw error
  }
}

module.exports = avatars