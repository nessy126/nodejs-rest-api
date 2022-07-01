const express = require('express')
const { ctrlWrapper } = require('../../helpers')
const { auth, upload } = require('../../middlewares')
const router = express.Router();
const { auth: ctrl } = require('../../controllers')

router.patch("/", auth, upload.single("image"), ctrlWrapper(ctrl.avatars))

module.exports = router