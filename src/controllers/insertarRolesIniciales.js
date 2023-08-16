import Role from '../models/Roles'

export const creaRoles = async () => {
    try{
        const count = await Role.estimatedDocumentCount()

        if(count > 0) return;

        const values = await Promise.all([
            new Role({nombreRole: 'Administrador'}).save(),
            new Role({nombreRole: 'Colaborador'}).save(),
            new Role({nombreRole: 'Cliente'}).save()
        ])

    }
    catch(error){
        console.error(error);
    }
}