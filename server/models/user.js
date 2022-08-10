const prisma = require('../utils/prismaClient')

const createUser = async (name, email, password, role) => {
  try {
    const newUser = await prisma.user.create({ 
      data: {
        name: name,
        email: email,
        password: password,
        role: role      
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
              email
          }
      });
      return user;

  } catch (error) {
      throw new Error("Error finding user");
  }
}

const deleteUserById = async (id) => {
  try {
      const deletedUser = await prisma.user.delete({
          where: {
              id: id                 
          }
      })
      return deletedUser;
  } catch(error) {
      console.log(error);
      throw new Error(error);
  }
}


module.exports = { createUser, findUserByEmail, deleteUserById };