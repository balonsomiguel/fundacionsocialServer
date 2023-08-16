import Usuario from "../models/Usuarios";
import jwt from "jsonwebtoken";
import config from "../config";
import Roles from "../models/Roles";

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

export const registro = async (req, res) => {
  const { nombre, correo, clave, roles } = req.body;
  // console.log(req);
  try {
    const newUsuario = new Usuario({
      nombre,
      correo,
      clave: await Usuario.encriptarClave(clave),
    });

    const usuarioDuplicado = await Usuario.findOne({ correo: correo });
    if (usuarioDuplicado) {
      return res.status(400).json(["Usuario ya existe"]);
    }

    if (roles) {
      const rolesGuardados = await Roles.find({ nombreRole: { $in: roles } });
      newUsuario.roles = rolesGuardados.map((rol) => rol._id);
    } else {
      const rol = await Roles.findOne({ nombreRole: "Cliente" });
      newUsuario.roles = [rol._id];
    }
    console.log(newUsuario);
    const usuarioGuardado = await newUsuario.save();
    const token = jwt.sign({ id: usuarioGuardado._id }, config.SEED, {
      expiresIn: 3600 /*un día*/,
    });
    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });
    res
      .status(200)
      .json({ usuarioGuardado, message: "Proceso Exitoso", codigo: "0" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const ingreso = async (req, res) => {
  const { correo, clave } = req.body;
  const usuarioEncontrado = await Usuario.findOne({ correo: correo });
  if (!usuarioEncontrado) {
    return res.status(400).json(["Usuario no existe"]);
  }
  const claveEncriptada = await Usuario.encriptarClave(clave);
  const claveCorrecta = await Usuario.compararClave(
    clave,
    usuarioEncontrado.clave
  );
  if (claveCorrecta) {
    const token = jwt.sign({ id: usuarioEncontrado._id }, config.SEED, {
      expiresIn: 3600 /*un día*/,
    });
    res.cookie("token", token,{
      httpOnly: false,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({ token: token });
  }
  res.status(401).json(["Clave erronea"]);
};

export const verificarSesion = async (req, res) => {
  const { tokenAcceso } = req.body;

  if (!tokenAcceso) {
    return res.status(400).json(["Necesario inicio de sesión"]);
  }

  const tokenClaro = jwt.verify(tokenAcceso, config.SEED);

  if (!tokenClaro) return res.status(400).json(["Token errado"]);

  const usuario = await Usuario.findById(tokenClaro.id);

  if (!usuario) return res.status(404).json(["Usuario no existe"]);

  return res.status(200).json({
    id: usuario._id,
    nombre: usuario.nombre,
    correo: usuario.correo,
  });
};
