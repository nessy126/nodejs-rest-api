const express = require('express')
const router = express.Router()
const { contacts: ctrl } = require('../../controllers')
const { ctrlWrapper } = require('../../helpers')
const { validation } = require('../../middlewares')
const {schemas} = require('../../models/Contact')

router.get('/', ctrlWrapper(ctrl.getAll))

router.get('/:contactId', ctrlWrapper(ctrl.getById))

router.post('/', validation(schemas.add), ctrlWrapper(ctrl.addContact))

router.delete('/:contactId', ctrlWrapper(ctrl.delContact))

router.put('/:contactId', validation(schemas.add), ctrlWrapper(ctrl.updateById))

router.patch('/:contactId/favorite', validation(schemas.updateFavorite), ctrlWrapper(ctrl.updateFavorite))

module.exports = router