import { Schema, model } from "mongoose";

const tareaSchema = new Schema(
  {
    idTarea: {
      type: String,
      unique: true,
    },
    nombre: {
      type: String,
      unique: true,
    },
    idUsuario: {
      type: String,
    },
    estado: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Tarea", tareaSchema);
