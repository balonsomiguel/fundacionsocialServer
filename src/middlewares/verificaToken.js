import jwt from "jsonwebtoken";
import config from "../config";
import Usuarios from "../models/Usuarios";
import Roles from "../models/Roles";

export const verificarToken = async (req, res, next) => {
    try{
        const tokenRecibido = ((req.headers.cookie).split('='))[1];
        console.log(tokenRecibido);
        const token = tokenRecibido;
        if (!token) {
            return res.status(403).json({ message: "Token no encontrado" });
        }

        const tokenClaro = jwt.verify(token, config.SEED);
        

        const usuario = await Usuarios.findById(tokenClaro.id);

        if (!usuario) return res.status(404).json({ message: "Usuario no existe" });

        console.log(usuario.roles);
        const { nombre, correo, clave, roles } = usuario;
        const rolesGuardados = await Roles.find({ _id: { $in: roles } });
        const listaRoles = rolesGuardados.map((rol) => rol.nombreRole);
        // console.log(listaRoles);
        // console.log(listaRoles.includes('Administrador'));
        if(!listaRoles.includes('Administrador')) return res.status(404).json({ message: "Usuario sin permisos" });

        next();
    }
    catch(error){
        res.json({message:"Necesario inicio de sesion"})
    }
};
