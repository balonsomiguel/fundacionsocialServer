import {Router} from 'express'
import {crearTarea, listarTareas, borrarTarea, terminarTarea}  from '../controllers/tareas.controller.js'

const router = Router();


router.post('/creartarea', crearTarea);

router.get('/listartarea/:usuarioId', listarTareas);

router.delete('/borrartarea/:tareaId', borrarTarea);

router.post('/terminartarea', terminarTarea);

export default router;