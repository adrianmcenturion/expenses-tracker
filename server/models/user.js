const { Role } = require('@prisma/client');
const prisma = require('../utils/prismaClient')

const createUser = async (name, email, password, role) => {
  try {
    const newUser = await prisma.user.create({ 
      data: {
        name: name,
        email: email,
        password: password,
        role: role === 'admin' ? Role.admin : Role.user      
      }
    });
    
    return newUser;      

  } catch (error) {
    throw new Error("Error creating user");
  }
}

const findUserByEmail = async (email) => {
  try {
      const user = await prisma.user.findUnique({
          where: {
              email: email,
          }
      });
      return user;

  } catch (error) {
      throw new Error("Error finding user");
  }
}

const getUsers = async () => {
  try {
    const users = await prisma.user.findMany()
      return users
    
  } catch (error) {
    throw new Error("Error finding users");
  }
}

const deleteUserById = async (id) => {
  try {
      const deletedUser = await prisma.user.deleteMany({
          where: {
              id             
          }
      })
      return deletedUser;
  } catch(error) {
      console.log(error);
      throw new Error(error);
  }
}


module.exports = { createUser, findUserByEmail, deleteUserById, getUsers };