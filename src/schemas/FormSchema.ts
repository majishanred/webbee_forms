import { z } from 'zod';
import { projectSchema } from './ProjectSchema.ts';
import IMask from 'imask';

//@Note: чет ничего лучше не придумал
const mask = IMask.createMask({
  mask: '+{7}(000)000-00-00',
});

export const formSchema = z.object({
  contacts: z.object({
    firstName: z
      .string({
        message: 'Обязательное поле',
      })
      .trim()
      .min(2, 'Имя не может состоять из 1 символа'),
    lastName: z
      .string({
        message: 'Обязательное поле',
      })
      .trim()
      .min(2, 'Фамилия не может состоять из 1 символа'),
    middleName: z.optional(z.string().trim().min(2, 'Не бывает такого короткого отчества')),
    email: z.optional(z.string().trim().email('Некоректное мыло')),
    phoneNumber: z
      .string({
        message: 'Обязательное поле',
      })
      .trim()
      .refine((phoneNumber) => {
        mask.resolve(phoneNumber);
        return mask.isComplete;
      }, 'Неверный номер телефона'),
    luboiDvij: z
      .boolean({
        message: 'Ты обязан быть за любой движ',
      })
      .refine((check) => check, 'Ты обязан быть за любой движ'),
  }),
  projects: z.array(projectSchema),
});
