const router = require("express").Router();
const ApplicantController = require("../controller/ApplicantController");

router.get("/:email", ApplicantController.getApplicantByEmail);

router.get("/:id", ApplicantController.getApplicantById);

router.get("/", ApplicantController.getApplicantList);

module.exports = router;
