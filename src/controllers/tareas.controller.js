import Tarea from "../models/Tareas";
import jwt from "jsonwebtoken";
import config from "../config";
import Roles from "../models/Roles";
import Tareas from "../models/Tareas";

// export const registro = async (req, res) => {
//     console.log(req)
//     res.status(201).json(req.body)
//     // const {nombre, correo, clave, roles} = req.body;
//     // console.log(req.body)
//     // const newUsuario = new Usuario({nombre, correo, clave});
//     // const usuarioGuardado = await newUsuario.save();
//     // // console.log(req.body)
//     // res.status(201).json(usuarioGuardado)
// }

export const crearTarea = async (req, res) => {
  const { tarea, usuario } = req.body;
  console.log(req.body);
  try {
    const idTarea = (await Tarea.find().count()) + 1;
    console.log(idTarea);
    const newTarea = new Tarea({
      idTarea,
      nombre: tarea.tarea,
      idUsuario: usuario.id,
      estado: "Pendiente",
    });
    console.log(newTarea);
    const tareaGuardado = await newTarea.save();
    res.status(200).json({ tareaGuardado });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const listarTareas = async (req, res) => {
  const { usuarioId } = req.params;

  const tareas = await Tarea.find({ idUsuario: usuarioId });
  res.json(tareas);
};

export const borrarTarea = async (req, res) => {
  const { tareaId } = req.params;
  const tokenRecibido = ((req.headers.cookie).split('='))[1];


  if (!tokenRecibido) {
    return res.status(403).json({ message: "Token no encontrado" });
  }

  console.log(tareaId);
  await Tarea.findByIdAndDelete(tareaId);

  const tokenClaro = jwt.verify(tokenRecibido, config.SEED);

  console.log(tokenClaro.id);

  const tareas = await Tarea.find({ idUsuario: tokenClaro.id });

  console.log(tareas);
  res.json(tareas);

};

export const terminarTarea = async (req, res) => {
  const { tareaId } = req.body;
  const tokenRecibido = ((req.headers.cookie).split('='))[1];


  if (!tokenRecibido) {
    return res.status(403).json({ message: "Token no encontrado" });
  }

  await Tarea.updateOne({_id:tareaId},{$set:{estado:"Completado"}})


  const tokenClaro = jwt.verify(tokenRecibido, config.SEED);


  const tareas = await Tarea.find({ idUsuario: tokenClaro.id });

  console.log(tareas);
  res.json(tareas);

};
