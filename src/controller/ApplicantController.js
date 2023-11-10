const Applicant = require("../entity/Applicant");

const getApplicantById = async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id);
    res.status(200).json(applicant);
  } catch (err) {
    console.log(err);
  }
};

const getApplicantList = async (req, res, next) => {
  try {
    const applicant = await Applicant.find();
    res.status(200).json(applicant);
  } catch (err) {
    next(err);
  }
};

const getApplicantByEmail = async (req, res) => {
  try {
    const applicant = await Applicant.find({ email: req.params.email });
    res.status(200).json(applicant);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getApplicantById,
  getApplicantList,
  getApplicantByEmail,
};
