const router = require("express").Router();

const SkillController = require("../controller/SkillController");

router.post("/create", SkillController.createSkill);

router.get("/:email", SkillController.getSkillListByEmail);

router.get("/single/:id", SkillController.getSkillById);

router.delete("/delete/:id", SkillController.deleteSkillById);

module.exports = router;
