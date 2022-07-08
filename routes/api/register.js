const express = require('express')
const { ctrlWrapper } = require('../../helpers')
const { validation, auth } = require('../../middlewares')
const {auth: ctrl} = require('../../controllers')
const { schemas } = require('../../models/User')
const router = express.Router()

router.post("/register", validation(schemas.registerUser), ctrlWrapper(ctrl.register))
router.post("/login", validation(schemas.loginUser), ctrlWrapper(ctrl.login))
router.post("/verify", validation(schemas.verifyEmail), ctrlWrapper(ctrl.resendVerifyEmail))
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail))
router.get("/logout", auth, ctrlWrapper(ctrl.logout))
router.get("/current", auth, ctrlWrapper(ctrl.current))
router.patch("/", auth, ctrlWrapper(ctrl.updateSubscription))

module.exports = router