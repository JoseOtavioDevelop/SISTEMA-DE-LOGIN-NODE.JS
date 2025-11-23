import express from "express";
import userController from "./controllers/userController.js";
import userMiddleware from "./middlewares/userMiddleware.js";

const router = express.Router();

router.get("/allListUsers", userController.getAllUsersController);
router.post("/createUsers",userMiddleware.validateUser,userController.createUsersController);
router.delete("/deleteUsers/:id", userController.deleteUsersController);
router.put("/updateUsers/:id", userController.updateUsersController);
router.post("/loginUsers", userController.loginUsersController);
router.get("/authRouteUser",userMiddleware.validateUserToken, userController.authenticateController);

export default router;
