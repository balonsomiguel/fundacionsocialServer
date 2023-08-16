import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'

const usuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      unique: true,
    },
    correo: {
      type: String,
      unique: true,
    },
    clave: {
      type: String,
      unique: true,
    },
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false
  }
);

usuarioSchema.statics.encriptarClave = async (clave) => {
  const salt = await bcrypt.genSalt(5);
  return await bcrypt.hash(clave, salt);
}

usuarioSchema.statics.compararClave = async (clave, claveIngresada) => {
  return await bcrypt.compare(clave, claveIngresada);
}


export default model("Usuario", usuarioSchema);