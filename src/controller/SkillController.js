const Skills = require("../entity/Skills");

const createSkill = async (req, res) => {
  try {
    const skill = await Skills.create(req.body);
    res.status(200).json(skill);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred " });
  }
};

const getSkillById = async (req, res) => {
  try {
    const skill = await Skills.findById(req.params.id);
    res.status(200).json(skill);
  } catch (err) {
    console.log(err);
  }
};

const getSkillListByEmail = async (req, res, next) => {
  try {
    const skill = await Skills.find({ email: req.params.email });
    res.status(200).json(skill);
  } catch (err) {
    next(err);
  }
};

const deleteSkillById = async (req, res) => {
  try {
    const skill = await Skills.findByIdAndDelete(req.params.id);
    res.status(200).json(skill);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createSkill,
  getSkillById,
  getSkillListByEmail,
  deleteSkillById,
};
