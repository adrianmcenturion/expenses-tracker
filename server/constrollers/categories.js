const category = require('../models/category')

const createCategory = async (req, res, next) => {

    const name = req.body.name
    const type = req.body.type
    
    if (!nameIsValid(name)) {
        res.statusCode = 400
        res.send('Name cannot be empty')
        return
    }

    if (await categoryAlreadyExists(name)) {
        res.statusCode = 404
        res.send('Category already exists')
        return
    }

    try {
        const newCategory = await category.create(name, type)
        res.send(newCategory)
    } catch (err) {
        console.log(err)
        res.statusCode = 500
        res.send(err.message)
    }
}

const showAll = async (req, res, next) => {

    try {
        const allCategories = await category.showAll()
        res.send(allCategories)
    } catch (err) {
        console.log(err)
        res.statusCode = 500
        res.send(err.message)
    }
}

const deleteCategory = async (req, res, next) => {

    const name = req.body.name

    try {
        const categoryDeleted = await category.deleteCategory(name)
        res.statusCode = 200
        res.send(categoryDeleted)
        
    } catch (error) {
        
    }
}

const nameIsValid = (name) => {
    return name !== ''
}

const categoryAlreadyExists = async (name) => {
    const categoryByName = await category.findByName(name);
    return categoryByName.length > 0;
  };


module.exports = { createCategory, showAll, categoryAlreadyExists, deleteCategory }