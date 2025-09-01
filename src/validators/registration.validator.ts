import { z } from 'zod';

export const createRegistrationModel = z.object({
    name: z.string().min(3),
    lastname: z.string().min(3),
    email: z.email(),
    phone: z.string().min(6)
}); 