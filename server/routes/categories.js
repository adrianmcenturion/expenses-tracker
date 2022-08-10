const express = require('express');

const categoriesController = require('../constrollers/categories');
const { authorizeAdmin } = require('../middlewares/authorization');

const router = express.Router()


// show all categories

router.get('/', categoriesController.showAll)

// create a new category

router.post('/create', authorizeAdmin, categoriesController.createCategory)

// delete category

router.delete('/delete', authorizeAdmin, categoriesController.deleteCategory)

module.exports = router