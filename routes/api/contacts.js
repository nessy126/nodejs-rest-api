const express = require('express')
const router = express.Router()
const { contacts: ctrl } = require('../../controllers')
const { ctrlWrapper, isValidId } = require('../../helpers')
const {
  validation,
  auth
} = require('../../middlewares')
const {schemas} = require('../../models/Contact')

router.get('/', auth, ctrlWrapper(ctrl.getAll))

router.get('/:contactId', auth, isValidId, ctrlWrapper(ctrl.getById))

router.post('/', auth, validation(schemas.add), ctrlWrapper(ctrl.addContact))

router.delete('/:contactId', auth, isValidId, ctrlWrapper(ctrl.delContact))

router.put('/:contactId', auth, validation(schemas.add), ctrlWrapper(ctrl.updateById))

router.patch('/:contactId/favorite', auth, isValidId, validation(schemas.updateFavorite), ctrlWrapper(ctrl.updateFavorite))

module.exports = router