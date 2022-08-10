
const expense = require('../models/expense')

const createExpense = async (req, res, next) => {

    const name = req.body.name;
    const amount = req.body.amount;
    const category = req.body.category;
    const user = req.user
    const type = req.body.type

    if (!nameIsValid(name)) {
        res.statusCode = 400
        res.send('Name cannot be empty')
        return
    }

    try {
        const newExpense = await expense.create(name, amount, category, user.email, type)
        res.send(newExpense)
    }catch (err) {
        console.log(err)
        res.statusCode = 500
        res.send(err.message)
    }
}

const findExpenseByName = async (req, res, next) => {

    const name = req.body.name

    if (name === '') {
        res.statusCode = 400
        res.send('Name cannot be empty')
    }

    try {
        const expenses = await expense.findByName(name)
        console.log('Response expense', expenses)
        res.send(expenses)
    } catch (err) {
        console.log(err)
        res.statusCode = 500
        res.send(err.message)
    }
}


const getByCategory = async (req, res, next) => {

    try {
        const category = req.body.category
        const getExpenses = await expense.getByCategory(category)
        res.send(getExpenses)
    } catch (err) {
        console.log(err)
        res.statusCode = 500
        res.send(err.message)
    }
}

const showAllMovements = async (req, res, next) => {

    try {
        const allMovements = await expense.showAllMovements()
        res.send(allMovements)
    } catch (err) {
        console.log(err)
        res.statusCode = 500
        res.send(err.message)
    }
}

const showAllExpenses = async (req, res, next) => {

    try {
        const allExpenses = await expense.showAllExpenses()
        res.send(allExpenses)
    } catch (err) {
        console.log(err)
        res.statusCode = 500
        res.send(err.message)
    }
}

const showAllIncomes = async (req, res, next) => {

    try {
        const allIncomes = await expense.showAllIncomes()
        res.send(allIncomes)
    } catch (err) {
        console.log(err)
        res.statusCode = 500
        res.send(err.message)
    }
}

const getTotalAmount = async (req, res, next) => {
    try {
        const total = await expense.getTotalAmount()
        res.send(total)
    } catch (err) {
        console.log(err)
        res.statusCode = 500
        res.send(err.message)
    }
}

const getTotalAmountByCategory = async (req, res, next) => {
    try {
        const category = req.body.category
        const total = await expense.getTotalAmountByCategory(category)
        res.send(total)
    } catch (err) {
        console.log(err)
        res.statusCode = 500
        res.send(err.message)
    }
}


const nameIsValid = (name) => {
    return name !== ''
}




module.exports = { createExpense, findExpenseByName, showAllExpenses, showAllIncomes, showAllMovements, getByCategory, getTotalAmount, getTotalAmountByCategory}