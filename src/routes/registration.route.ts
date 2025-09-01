import { Router } from "express";
import * as registrationController from "../controllers/registration.controller";

const registrationRouter = Router();

registrationRouter.post("/", registrationController.create);
registrationRouter.get("/", registrationController.getAll);
registrationRouter.get("/:id", registrationController.getById);

export default registrationRouter;
