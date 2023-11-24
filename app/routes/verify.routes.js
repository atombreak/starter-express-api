import { get, create } from "../controllers/verify.controller.js";
import { Router } from "express";

//Create a new Tutorial
const router = Router();

router.post("*", create);

router.get("*", get)

export default router;