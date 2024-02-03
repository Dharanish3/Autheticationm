import UserModel from "../Models/employee.js";
import dotenv from "dotenv";
import Auth from "../Auth/authenticate.js";
dotenv.config();

// get all user
const getUser = async (req, res) => {
  try {
    const user = await UserModel.find({},{password : 0});
    res.status(200).send({
      message: "User data",
      user,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// create user
const createUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      req.body.password = await Auth.createHash(req.body.password);
      const createUser = await UserModel.create(req.body);
      res.status(201).send({
        message: "User Created Successfully",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};


// get user by id
const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findOne({ name: req.params.name });
    if (user) {
      res.status(200).send({
        message: "User ",
        user,
      });
    } else {
      res.status(500).send({
        message: "Invalid User",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Erroe",
      error: error.message,
    });
  }
};

// login
    const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (user) {
        if (await Auth.getHash(password, user.password)) {
            const token = await Auth.createToken({
            name: user.name,
            email: user.email,
            role: user.role
            });
            res.status(200).send({
            message: "Login Successful",
            token,
            role: user.role,
            });
        } else {
            res.status(500).send({
            message: "Incorrect Password",
           
            });
        }
        } else {
        res.status(500).send({
            message: "Incorrect Email",
        });
        }
    } catch (error) {   
        res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
        });
    }
    };

export default {
  getUser,
  getUserById,
  createUser,
  login,
};
