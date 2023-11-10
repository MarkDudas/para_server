const router = require("express").Router();

const LicenseController = require("../controller/LicenseController");

router.post("/create", LicenseController.createLicense);

router.get("/:email", LicenseController.getLicenseByEmail);

router.get("/single/:id", LicenseController.getLicenseById);

router.get("/", LicenseController.GetLicenseList);

router.put("/update/:id", LicenseController.updateLicenseByid);

router.delete("/delete/:id", LicenseController.deleteLicenseById);

module.exports = router;
