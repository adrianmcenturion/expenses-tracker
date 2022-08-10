const prisma = require('../utils/prismaClient');


// const create = async (name, amount, categoryId, email) => {   

//     try {        
//         const newExpense = await prisma.expense.create(
//             {
//             data: {      
//                 name: name,                
//                 amount: amount,         
//                 category: {
//                     connect: {
//                         id: categoryId
//                     }
//                 },
//                 user: {
//                     connect: {
//                         email: email,
//                     }
//                 }                       
//             },           
//         })        
      
//         return (newExpense);        
        
//     } catch(error) {
//         console.log(error);
//         throw new Error(error);
//     }
// }



const create = async (name, amount, categoryId, email, type) => {
    
    try {
        if(type === 'expense') {
            
            const newExpense = await prisma.expense.create({
                data: {
                    name: name,
                    amount: amount,
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
        }

        if(type === 'income') {
            
            const newIncome = await prisma.income.create({
                data: {
                    name: name,
                    amount: amount,
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
            return newIncome
        }
    }catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

const findByName = async (name) => {

    try {

        let expenses
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
        return expenses
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }

}


const getByCategory = async (category) => {
    try {
        const expenses = await prisma.expense.findMany({
            where: {
                categoryId: category,
            },
            select: {
                name: true,
                amount: true,
                createdAt: true,
            },
        })
        return expenses

    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}



const showAllExpenses = async () => {
    try {
        const expenses = await prisma.expense.findMany({
            select: {
                name: true,
                amount: true,
                createdAt: true,
                category: true
            }
             
        })
        return expenses
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }
}

const showAllIncomes = async () => {
    try {
        const expenses = await prisma.income.findMany({
            select: {
                name: true,
                amount: true,
                createdAt: true,
                category: true
            }
             
        })
        return expenses
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }
}

const showAllMovements = async () => {
    try {
        let allMovements

        const expenses = await showAllExpenses()
        const incomes = await showAllIncomes()

        allMovements = {expenses: expenses, incomes: incomes}
        

        return allMovements
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }

}

const getTotalAmount = async () => {

    try {
        const expenses = await prisma.expense.findMany()

        let initialValue = 0

        let total = expenses.reduce((acc, currentValue) => { return acc + currentValue.amount }, initialValue)

        return `Total expenses: $${total}`

    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

const getTotalAmountByCategory = async (category) => {

    const expenses = await prisma.expense.findMany({
        where: {
            categoryId: category,
        }
    })

    let initialValue = 0

    let total = expenses.reduce((acc, currentValue) => { return acc + currentValue.amount }, initialValue)

    return `Total expenses: $${total}`

}

module.exports = { create, findByName, showAllIncomes, showAllExpenses, showAllMovements, getByCategory, getTotalAmount, getTotalAmountByCategory }