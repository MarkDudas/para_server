const Company = require("../entity/Company");

const createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(200).json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred " });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    res.status(200).json(company);
  } catch (err) {
    console.log(err);
  }
};

const getCompanyList = async (req, res, next) => {
  try {
    const company = await Company.find();
    res.status(200).json(company);
  } catch (err) {
    next(err);
  }
};

const getCompanyByEmail = async (req, res) => {
  try {
    const company = await Company.find({ email: req.params.email });
    res.status(200).json(company);
  } catch (error) {
    console.log(error);
  }
};

const updateCompanyById = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(company);
  } catch (err) {
    console.log(err);
  }
};

const deleteCompanyById = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    res.status(200).json(company);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createCompany,
  getCompanyById,
  getCompanyList,
  getCompanyByEmail,
  updateCompanyById,
  deleteCompanyById,
};
