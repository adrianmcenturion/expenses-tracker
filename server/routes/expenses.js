const express = require('express');

const expensesController = require('../constrollers/expenses')
const { userLoggedIn } = require('../middlewares/authorization');

const router = express.Router()


// create new expense

router.post('/create', userLoggedIn, expensesController.createExpense)

// search expense by name

router.get('/search/name', expensesController.findExpenseByName )

// show all movements

router.get('/all', expensesController.showAllMovements)


// show all expenses

router.get('/all/expenses', expensesController.showAllExpenses)

// show all incomes

router.get('/all/incomes', expensesController.showAllIncomes)

// search expense by category

router.get('/search/category', expensesController.getByCategory )

// get total amount

router.get('/total', expensesController.getTotalAmount)

// get category total amount

router.get('/total/category', expensesController.getTotalAmountByCategory )



module.exports = router