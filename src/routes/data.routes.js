import {Router} from 'express'
import {almacenardata}  from '../controllers/data.controller.js'

const router = Router();


router.post('/almacenardata', almacenardata);

export default router;