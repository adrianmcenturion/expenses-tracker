const prisma = require('../utils/prismaClient');

const create = async (name, type) => {

    try {

        if(type === 'expense') {

            const newCategory = await prisma.expenseCategory.create({
                data: {
                    name: name,
                },
            })
            return newCategory
        }

        if(type === 'income') {
            const newCategory = await prisma.incomeCategory.create({
                data: {
                    name: name,
                },
            })
            return newCategory
        }
            
    
        } catch (err) {
            console.error(err)
            throw new Error(err)
        }
    }

const showAll = async () => {
    try {
        const expensesCategories = await prisma.expenseCategory.findMany()
        const incomesCategories = await prisma.incomeCategory.findMany()
        const allCategories = {
            expenses: expensesCategories,
            incomes: incomesCategories
        }
        return allCategories
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }
}

const findByName = async (name, type) => {
    try {
        if(type === 'income') {
            return await prisma.incomeCategory.findMany({
                where: {name: name},
            })
        }

        if(type === 'expense') {
            return await prisma.expenseCategory.findMany({
                where: {name: name},
            })
        }
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

const deleteCategory = async (name, type) => {
    try {
        if(type === 'income') {
            const deleted = await prisma.incomeCategory.delete({
                where: {name: name}
            })
            
            return deleted
        }

        if(type === 'expense') {
            const deleted = await prisma.expenseCategory.delete({
                where: {name: name}
            })
            
            return deleted
        }
        
    } catch (error) {
        
    }

}



module.exports = { create, showAll, findByName, deleteCategory }