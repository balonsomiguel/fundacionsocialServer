import express from "express";
import morgan from "morgan";
import cors from 'cors';
import autenticacionRoute from "./routes/autenticacion.routes.js";
import usuariosRoute from "./routes/usuarios.routes.js";
import tareasRoute from "./routes/tareas.routes.js";
import rolesRoute from "./routes/roles.routes.js";
import dataRoute from "./routes/data.routes.js";
import {creaRoles} from "./controllers/insertarRolesIniciales.js";
import {verificarToken} from "./middlewares/verificaToken.js"

const app = express();

creaRoles();

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}
));

app.use(morgan("dev"));

app.use(express.json());


const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


//Endpoint para consumo de validación de ingreso y registro de usuario
app.use("/api", autenticacionRoute);

//Endpoint para consumo de información relacionada a usuarios registrados
//Solo los usuario logeados en el aplicativo podrán realizar consultas de usuarios
app.use("/api/usuarios",verificarToken, usuariosRoute);

//Solo los usuario logeados en el aplicativo podrán realizar consultas de tareas
app.use("/api/tareas", tareasRoute);

//Endpoint para consumo de información relacionada a roles registrados
app.use("/api/roles", verificarToken, rolesRoute);

//Endpoint para consumo de almacenamiento de archivos desde cliente a servidor
app.use("/api/data", upload.single('archivo'), dataRoute);

export default app;
