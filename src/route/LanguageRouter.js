const router = require("express").Router();

const LanguageController = require("../controller/LanguageController");

router.post("/create", LanguageController.createLanguage);

router.get("/:email", LanguageController.getLanguageListByEmail);

router.get("/:id", LanguageController.getLanguageById);

router.delete("/delete/:id", LanguageController.deleteLanguageById);

module.exports = router;
