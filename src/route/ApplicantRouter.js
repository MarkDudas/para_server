const router = require("express").Router();
const ApplicantController = require("../controller/ApplicantController");

router.get("/:email", ApplicantController.getApplicantByEmail);

router.get("/:id", ApplicantController.getApplicantById);

router.get("/", ApplicantController.getApplicantList);

router.get(
  "/get-by-job/count/:filter",
  ApplicantController.getApplicantJobCounts
);

router.get(
  "/get-by-job/count/today",
  ApplicantController.getApplicantJobCountsToday
);

module.exports = router;
