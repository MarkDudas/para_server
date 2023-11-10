const License = require("../entity/License");

const createLicense = async (req, res) => {
  try {
    const license = await License.create(req.body);
    res.status(200).json(license);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred " });
  }
};

const getLicenseById = async (req, res) => {
  try {
    const license = await License.findById(req.params.id);
    res.status(200).json(license);
  } catch (err) {
    console.log(err);
  }
};

const GetLicenseList = async (req, res, next) => {
  try {
    const license = await License.find();
    res.status(200).json(license);
  } catch (err) {
    next(err);
  }
};

const getLicenseByEmail = async (req, res) => {
  try {
    const license = await License.find({ email: req.params.email });
    res.status(200).json(license);
  } catch (error) {
    console.log(error);
  }
};

const updateLicenseByid = async (req, res) => {
  try {
    const license = await License.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(license);
  } catch (err) {
    console.log(err);
  }
};

const deleteLicenseById = async (req, res) => {
  try {
    const license = await License.findByIdAndDelete(req.params.id);
    res.status(200).json(license);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createLicense,
  getLicenseById,
  getLicenseByEmail,
  GetLicenseList,
  updateLicenseByid,
  deleteLicenseById,
};
