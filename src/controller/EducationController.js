const Education = require("../entity/Education");

const createEducation = async (req, res) => {
  try {
    const education = await Education.create(req.body);
    res.status(200).json(education);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred " });
  }
};

const getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    res.status(200).json(education);
  } catch (err) {
    console.log(err);
  }
};

const getEducationList = async (req, res, next) => {
  try {
    const education = await Education.find();
    res.status(200).json(education);
  } catch (err) {
    next(err);
  }
};

const getEducationByEmail = async (req, res) => {
  try {
    const education = await Education.find({ email: req.params.email });
    res.status(200).json(education);
  } catch (error) {
    console.log(error);
  }
};

const updateEducationById = async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(education);
  } catch (err) {
    console.log(err);
  }
};

const deleteEducationById = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    res.status(200).json(education);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createEducation,
  getEducationById,
  getEducationByEmail,
  getEducationList,
  updateEducationById,
  deleteEducationById,
};
