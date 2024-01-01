const router = require("express").Router();

const CompanyController = require("../controller/CompanyController");

router.post("/create", CompanyController.createCompany);

router.get("/:email", CompanyController.getCompanyByEmail);

router.get("/single/:id", CompanyController.getCompanyById);

router.get("/", CompanyController.getCompanyList);

router.put("/update/:id", CompanyController.updateCompanyById);

router.delete("/delete/:id", CompanyController.deleteCompanyById);

module.exports = router;
