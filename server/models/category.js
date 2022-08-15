const { CategoryType } = require('@prisma/client');
const prisma = require('../utils/prismaClient');

const create = async (name, type) => {

    try {

        const newCategory = await prisma.expenseCategory.create({
            data: {
                name: name,
                type: (type === 'expense') ? CategoryType.expensesCategory : CategoryType.incomesCategory,
                
            },
        })
        return newCategory
   
        } catch (err) {
            console.error(err)
            throw new Error(err)
        }
    }

const showAll = async () => {
    try {
        const expensesCategories = await prisma.expenseCategory.findMany({
            where: {
                type: CategoryType.expensesCategory
            }
        })

        const incomesCategories = await prisma.expenseCategory.findMany({
            where: {
                type: CategoryType.incomesCategory
            }
        })
        
        return {expenses: expensesCategories, incomes: incomesCategories}
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }
}

const findByName = async (name) => {
    try {
   
        return await prisma.expenseCategory.findMany({
            where: {name: name},
        })
        
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

const deleteCategory = async (name, type) => {
    try {
        
        const deleted = await prisma.expenseCategory.delete({
            where: {name: name}
        })
        
        return deleted
        
        
    } catch (error) {
        
    }

}



module.exports = { create, showAll, findByName, deleteCategory }