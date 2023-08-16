import { Router } from "express";
const router = Router();

import * as rolesControl from "../controllers/rol.controller.js";

router.get("/listar", rolesControl.listar);

export default router;