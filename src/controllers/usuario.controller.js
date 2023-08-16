import Usuario from "../models/Usuarios";

export const listar = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

export const obtenerUsuarioById = async (req, res) => {
  // console.log(req.params);
  const { usuarioId } = req.params;

  const usuario = await Usuario.findById(usuarioId);
  res.status(200).json(usuario ? usuario : "");
};

export const obtenerUsuarioByEmail = async (req, res) => {
    // console.log(req.params);
    const { usuarioCorreo } = req.params;
    const usuario = await Usuario.findOne({ 'correo':  usuarioCorreo});
    res.status(200).json(usuario ? usuario : "");
  };

  export const obtenerUsuarioByName = async (req, res) => {
    console.log(req.params);
    const { nombreUsuario } = req.params;
    // const cadena = '/'+nombreUsuario+'$/i';///cE-1$/i
    const usuario = await Usuario.find({ 'nombre':  {$regex : nombreUsuario}});
    console.log(usuario);
    res.status(200).json(usuario ? usuario : "");
  };

export const actualizarUsuario = async (req, res) => {
  const usuarioActualizado = await Usuario.findByIdAndUpdate(
    req.params.usuarioId,
    req.body
  );
  res.status(200).json(usuarioActualizado?usuarioActualizado:"");
};

export const eliminarUsuario = async (req, res) =>  {
    const { usuarioId } = req.params;

    console.log(usuarioId);
    await Usuario.findByIdAndDelete(usuarioId);
  
    // code 200 is ok too
    res.status(204).json();
  };