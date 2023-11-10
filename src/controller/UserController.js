const User = require("../entity/User");
const bcrypt = require("bcrypt");

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
};
