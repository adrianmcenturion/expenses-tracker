const { ExpensesType } = require('@prisma/client');
const prisma = require('../utils/prismaClient');
const { showAll } = require('./category');

const create = async (name, date, amount, categoryId, email, type) => {
    
    try {

        const newExpense = await prisma.expense.create({
            data: {
                name: name,
                date: date,
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
                date: true,
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
                date: true,
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
                date: true,
                type: true,
                category: true
            }, 
            orderBy: {
                date: 'desc',
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
                date: true,
                type: true,
                category: true
            }, 
            orderBy: {
                date: 'desc',
            }, take: 5
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

const getTotalAmountByCategory = async (email) => {

    try {

        const expensesCategories = await prisma.expense.groupBy({
            by: ['categoryId'],
            where: {
                user: {
                        email: email,
                    },

            },_sum: {
                amount: true,
            },
        })

        const categories = await showAll()
        
        const res = await Promise.all([expensesCategories, categories])

        const result = res[0].map( item => {
            const obj = res[1].expenses.find( o => o.id === item.categoryId);
            return { ...item, ...obj };
        });
        
        const filteredResult = result.filter( x => x.name);

        return filteredResult
        
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }

}

const deleteExpense = async (id, email) => {
    try {
        
        const deleted = await prisma.expense.deleteMany({
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