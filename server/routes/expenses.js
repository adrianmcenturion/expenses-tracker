const express = require('express');

const expensesController = require('../constrollers/expenses')
const { userLoggedIn } = require('../middlewares/authorization');

const router = express.Router()


// create new expense

router.post('/create', userLoggedIn, expensesController.createExpense)

// search expense by name

router.get('/search/name', userLoggedIn, expensesController.findExpenseByName )

// show all movements

router.get('/', userLoggedIn, expensesController.showAllMovements)

//show last movements

router.get('/last', userLoggedIn, expensesController.showLastMovements)

// search expense by category

router.get('/search/category', userLoggedIn, expensesController.getByCategory )

// get balance

router.get('/balance', userLoggedIn, expensesController.getBalance)

// get category balance

router.get('/balance/category', userLoggedIn, expensesController.getTotalAmountByCategory )

//delete a expense

router.delete('/delete', userLoggedIn, expensesController.deleteExpense)



module.exports = router