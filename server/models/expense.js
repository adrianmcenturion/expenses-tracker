const { ExpensesType } = require('@prisma/client');
const prisma = require('../utils/prismaClient');

const create = async (name, amount, categoryId, email, type) => {
    
    try {

        const newExpense = await prisma.expense.create({
            data: {
                name: name,
                amount: amount,
                type: (type === 'expense') ? ExpensesType.expenseType : ExpensesType.incomeType,
                category: {
                    connect: {
                        id: categoryId
                    }
                },
                user: {
                    connect: {
                        email: email,
                    }
                }                      
            }
        })  
        return newExpense

    }catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

const findByName = async (name) => {

    try {
        const expense = await prisma.expense.findMany({
            where: {
                name: name
            },
            select: {
                name: true,
                amount: true,
                createdAt: true,
                ExpenseCategory: true
            }
        })
        return expense
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }

}


const getByCategory = async (category, email) => {
    try {
        const expenses = await prisma.expense.findMany({
            where: {
                categoryId: category,
                user: {
                    email: email
                }
            },
            select: {
                name: true,
                amount: true,
                createdAt: true,
                category: true,
            },
        })
        return expenses

    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

const showAllMovements = async (email) => {
    try {
        const expenses = await prisma.expense.findMany({

            where: {
                user: {    
                        email: email
                    }
                
            },
             select: {
                id: true,
                name: true,
                amount: true,
                createdAt: true,
                type: true,
                category: true
            }, 
            orderBy: {
                createdAt: 'desc',
            },  
        })
        return expenses
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }

}

const showLastMovements = async (email) => {
    try {
        const movements = await prisma.expense.findMany({
            where: {
                user: {    
                        email: email
                    }
                
            },
            select: {
                name: true,
                amount: true,
                createdAt: true,
                type: true,
                category: true
            }, 
            orderBy: {
                createdAt: 'desc',
            }, take: 10
        })

        return movements
    } catch (error) {
        
    }
}

const getBalance = async (email) => {

    try {

        const movements = await prisma.expense.count({
            where: {
                user: {    
                        email: email
                    }
                
            },
        })
        const expenses = await showAllMovements(email)
        
        let inc = 0
        let exp = 0

        for(let i = 0; i < expenses.length; i++) {
            expenses[i].type === 'incomeType' ? inc += expenses[i].amount : exp += expenses[i].amount
        }

        return {
            income: inc,
            expense: exp,
            balance: inc - exp,
            transactions: movements
        }

    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

const getTotalAmountByCategory = async (category, email) => {

    try {
        
        const arr = await getByCategory(category, email)
    
        let sum = 0
        for(let i = 0; i < arr.length; i++) {
            sum += arr[i].amount   
        }
    
        return  {category: arr[0].category.name, total: sum}
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }


}

const deleteExpense = async (id, email) => {
    try {
        
        const deleted = await prisma.expense.delete({
            where: {
                id: id,
                user: {
                    email: email
                }
            }
        })
        
        return deleted
        
        
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }

}


module.exports = { create, findByName, showAllMovements, getByCategory, getBalance, getTotalAmountByCategory, showLastMovements, deleteExpense }