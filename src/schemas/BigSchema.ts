import { z } from 'zod';
import { projectSchema } from './ProjectSchema.ts';

export const bigSchema = z.object({
  contacts: z.object({
    firstName: z.string().min(1, 'Обязательное поле'),
    lastName: z.string().min(1, 'Обязательное поле'),
    middleName: z.optional(z.string().min(1, 'Не бывает такого короткого отчества')),
    email: z.optional(z.string().email('Некоректное мыло')),
    phoneNumber: z.string(),
    luboiDvij: z
      .boolean({
        message: 'Ты обязан быть за любой движ',
      })
      .refine((check) => check, 'Ты обязан быть за любой движ'),
  }),
  projects: z.array(projectSchema),
});
