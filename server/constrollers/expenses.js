
const expense = require('../models/expense')

const createExpense = async (req, res, next) => {

    const name = req.body.name;
    const date = new Date(req.body.date)
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
        const newExpense = await expense.create(name, date, amount, category, user.email, type)
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
        const user = req.user
        const category = req.body.category
        const getExpenses = await expense.getByCategory(category, user.email)
        res.send(getExpenses)
    } catch (err) {
        console.log(err)
        res.statusCode = 500
        res.send(err.message)
    }
}

const showAllMovements = async (req, res, next) => {
    try {
        const user = req.user
        const allMovements = await expense.showAllMovements(user.email)
        res.send(allMovements)
    } catch (err) {
        console.log(err)
        res.statusCode = 500
        res.send(err.message)
    }
}

const showLastMovements = async (req, res, next) => {
    try {
        const user = req.user
        const showLastMovements = await expense.showLastMovements(user.email)
        res.send(showLastMovements)
    } catch (err) {
        console.log(err)
        res.statusCode = 500
        res.send(err.message)
    }
}

const getBalance = async (req, res, next) => {
    try {
        const user = req.user
        const total = await expense.getBalance(user.email)
        res.send(total)
    } catch (err) {
        console.log(err)
        res.statusCode = 500
        res.send(err.message)
    }
}

const getTotalAmountByCategory = async (req, res, next) => {
    try {
        const user = req.user
        // const category = req.body.category
        const total = await expense.getTotalAmountByCategory(user.email)
        res.send(total)
    } catch (err) {
        console.log(err)
        res.statusCode = 500
        res.send(err.message)
    }
}

const deleteExpense = async (req, res, next) => {
    
    const id = req.body.id
    const user = req.user

    try {
        const expenseDeleted = await expense.deleteExpense(id, user.email)
        res.statusCode = 200
        res.send(expenseDeleted)
        
    } catch (err) {
        console.log(err)
        res.statusCode = 500
        res.send(err.message)
    }
}


const nameIsValid = (name) => {
    return name !== ''
}




module.exports = { createExpense, findExpenseByName, showLastMovements, showAllMovements, getByCategory, getBalance, getTotalAmountByCategory, deleteExpense}