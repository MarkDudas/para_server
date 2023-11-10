const router = require("express").Router();

const CareerHistoryController = require("../controller/CareerHistoryController");

router.post("/create", CareerHistoryController.createCareer);

router.get("/:email", CareerHistoryController.getByEmail);

router.get("/single/:id", CareerHistoryController.getCareerById);

router.get("/", CareerHistoryController.getCareerList);

router.put("/update/:id", CareerHistoryController.updatedCareerById);

router.delete("/delete/:id", CareerHistoryController.deleteCareerById);

module.exports = router;
