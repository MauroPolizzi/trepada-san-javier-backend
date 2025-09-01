import Registration, { IRegistration } from "../models/registration.model";

export const createRegistration = async (data: IRegistration): Promise<IRegistration> => {
  const registration = new Registration(data);
  return await registration.save();
};

export const getAllRegistrations = async (): Promise<IRegistration[]> => {
  return await Registration.find();
};

export const getRegistrationById = async (id: string): Promise<IRegistration | null> => {
  return await Registration.findById(id);
};
