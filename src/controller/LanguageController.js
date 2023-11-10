const Language = require("../entity/Language");

const createLanguage = async (req, res) => {
  try {
    const language = await Language.create(req.body);
    res.status(200).json(language);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred " });
  }
};

const getLanguageById = async (req, res) => {
  try {
    const language = await Language.findById(req.params.id);
    res.status(200).json(language);
  } catch (err) {
    console.log(err);
  }
};

const getLanguageListByEmail = async (req, res, next) => {
  try {
    const language = await Language.find({ email: req.params.email });
    res.status(200).json(language);
  } catch (err) {
    next(err);
  }
};

const deleteLanguageById = async (req, res) => {
  try {
    const language = await Language.findByIdAndDelete(req.params.id);
    res.status(200).json(language);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createLanguage,
  getLanguageById,
  getLanguageListByEmail,
  deleteLanguageById,
};
