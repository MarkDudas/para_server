const User = require("../entity/User");
const bcrypt = require("bcrypt");
const Joi = require('joi');

const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Missing email field" });
    }

    const existingUser = await User.findOne({ email });
    const emailExists = !!existingUser;

    res.status(200).json({ emailExists });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const registerUser = async (req, res) => {
  try {
    const {
      lastName,
      firstName,
      address,
      position,
      gender,
      birthday,
      role,
      email,
      password,
    } = req.body;
    
    const passwordValidation = Joi.object({
      password: Joi.string()
        .min(6)
        .regex(/^(?=.*[A-Z])(?=.*\d)/)
        .required()
        .messages({
          'string.min': 'Password must be at least 6 characters long',
          'string.pattern.base': 'Password must contain at least one uppercase letter and one digit',
        }),
    });
    
    const { error } = passwordValidation.validate({ password });
    
    if (error) {
      return res.status(400).json({ message: error.details.map((detail) => detail.message) });
    }
    
    if (!lastName || !firstName || !address || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      lastName,
      firstName,
      address,
      position,
      email,
      role,
      gender,
      birthday,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "User logged in successfully", user });
  } catch (err) {
    console.log(err);
  }
};

const getSpecificUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const getUserList = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const getUsersByRole = async (req, res) => {
  try {
    const user = await User.find({ role: "hr" });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const updateUserByEmail = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { personalSummary: req.body.personalSummary }
    );
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const updatePasswordByEmail = async (req, res) => {
  const { password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { password: hashedPassword }
    );
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getSpecificUserByEmail,
  getUserList,
  updateUserByEmail,
  updatePasswordByEmail,
  getUsersByRole,
  checkEmail,
};
