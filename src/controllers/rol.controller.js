import Rol from "../models/Roles";

export const listar = async (req, res) => {
  const roles = await Rol.find();
  res.json(roles);
};