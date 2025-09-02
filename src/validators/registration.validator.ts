import { z, email } from 'zod';
import Registration ,{ IRegistration } from "../models/registration.model";

// Schema de validación con Zod
export const registrationValidator = z.object({
  name: z.string().nonempty("El nombre es obligatorio").min(3, "El nombre debe ser mayor a 3 caracteres"),
  lastname: z.string().nonempty("El apellido es obligatorio").min(3, "El apellido debe ser mayor a 3 caracteres"),
  email: z.email("Email inválido"),
  phone: z.number("El teléfono deben ser solo numeros").min(6, "El teléfono es obligatorio y debe contener por lo menos 6 numeros"),
  age: z.number().int().optional(), // no requerido
  bicycleBrand: z.string().optional()          // no requerido
});

// Tipo TypeScript inferido
export type RegistrationInput = z.infer<typeof registrationValidator>;

// Función de validación para campos requeridos
export const validateRegistration = (data: IRegistration) => {
    return registrationValidator.safeParse(data);
};

export const validateEmailExist = async (email: string): Promise<boolean> => {
    const exist = await Registration.findOne({ email });
    if(exist) return true;
    return false;
}

export const validatePhoneExist = async (phone: number): Promise<boolean> => {
    const exist = await Registration.findOne({ phone });
    if(exist) return true;
    return false;
}
