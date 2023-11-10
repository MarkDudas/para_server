const router = require("express").Router();
const UserController = require("../controller/UserController");

router.post("/register", UserController.registerUser);

router.post("/login", UserController.loginUser);

router.get("/:email", UserController.getSpecificUserByEmail);

router.get("/list", UserController.getUserList);

router.put("/update/:email", UserController.updateUserByEmail);

router.put("/update-password/:email", UserController.updatePasswordByEmail);

router.get("/list/hr", UserController.getUsersByRole);

module.exports = router;
