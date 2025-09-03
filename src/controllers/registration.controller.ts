import { Request, Response } from "express";
import * as registrationService from "../services/registrations.service";
import { sendEmail } from "../services/email.service";

// Crear inscripción
export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const registration = await registrationService.createRegistration(req.body);
    
    res.status(201).json({registration, sendEmail: 'ok'});
  } catch (error: any) {
    if(error.name === "ValidationError") 
      res.status(400).json({ message: error.errors });
    else 
      res.status(400).json({ message: "Error creando inscripción", error: error.message });
  }
};

// Obtener todas
export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const registrations = await registrationService.getAllRegistrations();
    res.json(registrations);
  } catch (error: any) {
    res.status(500).json({ message: "Error obteniendo inscripciones", error: error.message });
  }
};

// Obtener por ID
export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const registration = await registrationService.getRegistrationById(req.params.id);
    if (!registration) {
      res.status(404).json({ message: "No encontrado" });
      return;
    }
    res.json(registration);
  } catch (error: any) {
    res.status(500).json({ message: "Error obteniendo inscripción", error: error.message });
  }
};


