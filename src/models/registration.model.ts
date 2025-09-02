import mongoose, { Schema, model } from 'mongoose';

export interface IRegistration extends Document {
  name: string;
  lastname: string;
  email: string;
  phone: number;
  age: string;
  bicycleBrand: string
}

const RegistrationModel = new Schema({
  
  // Datos requeridos
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },

  // Datos no requeridos
  age: { type: Number },
  bicycleBrand: { type: String }

}, { versionKey: false });

const Registration = mongoose.model<IRegistration>('Registration', RegistrationModel);

export default Registration;
