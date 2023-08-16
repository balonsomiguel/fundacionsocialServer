// import Rol from "../models/Roles";
import { fs } from "fs";
import { busboy } from "connect-busboy";



export const almacenardata = async (req, res) => {

    console.log(req.file);
    res.status(200).json(req.file);
};

