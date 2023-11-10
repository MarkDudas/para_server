const CareerHistory = require("../entity/CareerHistory");

const createCareer = async (req, res) => {
  try {
    const career = await CareerHistory.create(req.body);
    res.status(200).json(career);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred " });
  }
};

const getCareerById = async (req, res) => {
  try {
    const career = await CareerHistory.findById(req.params.id);
    res.status(200).json(career);
  } catch (err) {
    console.log(err);
  }
};

const getCareerList = async (req, res, next) => {
  try {
    const career = await CareerHistory.find();
    res.status(200).json(career);
  } catch (err) {
    next(err);
  }
};

const getByEmail = async (req, res) => {
  try {
    const career = await CareerHistory.find({ email: req.params.email });
    res.status(200).json(career);
  } catch (error) {
    console.log(error);
  }
};

const updatedCareerById = async (req, res) => {
  try {
    const career = await CareerHistory.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(career);
  } catch (err) {
    console.log(err);
  }
};

const deleteCareerById = async (req, res) => {
  try {
    const career = await CareerHistory.findByIdAndDelete(req.params.id);
    res.status(200).json(career);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createCareer,
  getCareerById,
  getByEmail,
  getCareerList,
  updatedCareerById,
  deleteCareerById,
};
