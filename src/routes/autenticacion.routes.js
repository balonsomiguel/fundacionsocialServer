import {Router} from 'express'
import {registro, ingreso, verificarSesion}  from '../controllers/autenticacion.controller.js'

const router = Router();


router.post('/registrar', registro);

router.post('/ingresar', ingreso);

router.post('/verificarsesion', verificarSesion);

export default router;