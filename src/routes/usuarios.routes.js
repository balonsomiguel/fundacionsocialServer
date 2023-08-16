import { Router } from "express";
const router = Router();

import * as usuariosControl from "../controllers/usuario.controller";

router.get("/listar", usuariosControl.listar);

router.get("/:usuarioId", usuariosControl.obtenerUsuarioById);

router.get("/buscar/:nombreUsuario", usuariosControl.obtenerUsuarioByName);

router.get("/correo/:usuarioCorreo", usuariosControl.obtenerUsuarioByEmail);

router.put("/actualizar/:usuarioId", usuariosControl.actualizarUsuario);

router.delete("/eliminar/:usuarioId", usuariosControl.eliminarUsuario);

export default router;
