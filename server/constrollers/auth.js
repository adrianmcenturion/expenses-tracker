const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../models/user");

const registerUser = async (req, res) => {
  try {
      const name = req.body.name;
      const email = req.body.email;        
      const password = req.body.password;   
      const role = req.body.role;       
      
      if (!validPassword(password)){
          res.status(400).json({message: "Invalid password"});
          return;
      }            
      
      if (await searchUserByEmail(email)) {
          res.status(400).json({message: "Email already exists"});
          return;
      }        
      
      const hash = await bcrypt.hash(password, 10);
      const newUser = await users.createUser(name, email, hash, role);
      res.send(newUser);
      return

  } catch(error) {
      res.status(500).json({message: error.message});
      return;
  }   
}

const loginUser = async (req, res, next) => {
  const userBody = req.body;
  let user;
  try {
    user = await searchUserByEmail(userBody.email);
    if (!user) {
      res.status(500).json({ message: "Could not retrieve user from DB" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Could not retrieve user from DB", error });
    return;
  }

  const isUserPasswordOK = await checkUserPassword(
    userBody.password,
    user.password
  );
  if (!isUserPasswordOK) {
    res.status(403).json({ message: "Email and password not valid" });
    return;
  }

  const accessToken = signToken(user, process.env.ACCESS_TOKEN_SECRET, 60 * 10 * 24);
  try {
    res.json({ accessToken: accessToken });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};

const getUsers = async (req, res, next) => {
  try {
    const user = await users.getUsers()
    res.send(user)
    res.status(200)
    
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
}

const getUserInfo = async (req, res, next) => {
  try {
    const email = req.user.email; 
    const user = await users.getUserInfo(email)
    res.send(user)
    res.status(200)
    
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
}

const deleteUserById = async (req, res, next) => {
  try {
    const id = req.body.id
    const user = await users.deleteUserById(id);
    res.send(user)
    
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
}

const signToken = (user, secret, expiration) => {
  const token = jwt.sign(
    {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: getUserRole(user),
    },
    secret,
    { expiresIn: expiration }
  );
  return token;
};

const checkUserPassword = async (received, hash) => {
  try {
    const result = await bcrypt.compare(received, hash);
    return result;
  } catch (error) {
    return false;
  }
};

const searchUserByEmail = async (email) => {
  const user = await users.findUserByEmail(email);
  return user;
};

const validPassword = (password) => {
  return password;
};

const getUserRole = (user) => {
  if (user.role === "admin") {
    return "admin";
  }
  return "none";
};

module.exports = { registerUser, loginUser, deleteUserById, getUsers, getUserInfo };