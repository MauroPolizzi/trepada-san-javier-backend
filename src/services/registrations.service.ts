import Registration, { IRegistration } from "../models/registration.model";
import { validateEmailExist, validatePhoneExist, validateRegistration } from "../validators/registration.validator";
import { sendEmail } from "./email.service";

export const createRegistration = async (data: IRegistration): Promise<IRegistration> => {

    // Capturamos las validaciones de los campos requeridos
    const validation = validateRegistration(data);

    // Devolvemos una excepcion
    if(!validation.success) {
        // Lanzamos un error con formato claro
        const errors = validation.error.issues.map(err => ({
          field: err.path.join("."), // ejemplo: "name"
          message: err.message       // ejemplo: "El nombre es obligatorio"
        }));
        throw { name: "ValidationError", errors };
    }

    // Capturamos validacion para email que ya exista en db
    const emailExist = await validateEmailExist(data.email);
    
    if(emailExist.valueOf() === true) {
        const errors = {field: 'email', message: 'El email ya esta registrado'};
        throw { name: "ValidationError", errors};
    }

    // Capturamos validacion para phone que ya exista en db
    const phoneExist = await validatePhoneExist(data.phone);
    
    if(phoneExist.valueOf() === true) {
        const errors = {field: 'phone', message: 'El teléfono ya esta registrado'};
        throw { name: "ValidationError", errors};
    }

    // Si no tenemos errores en validaciones, podemos enviar el mail y crear la inscripcion
    await sendEmailRegistration(data.email);

    const registration = new Registration(data);
    return await registration.save();
};

export const getAllRegistrations = async (): Promise<IRegistration[]> => {
    return await Registration.find();
};

export const getRegistrationById = async (id: string): Promise<IRegistration | null> => {
    return await Registration.findById(id);
};

const sendEmailRegistration = async (emailTo: string) => {
    await sendEmail(emailTo, "Inscripcion a evento", "")
}
