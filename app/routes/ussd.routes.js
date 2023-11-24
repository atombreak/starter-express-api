import { create, get } from "../controllers/ussd.controller.js";
import { Router } from "express";

//Create a new Tutorial
const router = Router();

router.post("*", get);

router.get("*", create);

export default router;