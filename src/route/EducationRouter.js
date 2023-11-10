const router = require("express").Router();

const EducationController = require("../controller/EducationController");

router.post("/create", EducationController.createEducation);

router.get("/:email", EducationController.getEducationByEmail);

router.get("/single/:id", EducationController.getEducationById);

router.get("/", EducationController.getEducationList);

router.put("/update/:id", EducationController.updateEducationById);

router.delete("/delete/:id", EducationController.deleteEducationById);

module.exports = router;
