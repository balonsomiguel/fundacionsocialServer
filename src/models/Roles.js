import {Schema, model} from "mongoose"

const roleSchema = new Schema(
    {
        nombreRole: String
    },
    {
        versionKey: false
    }
);

export default model("Role", roleSchema);