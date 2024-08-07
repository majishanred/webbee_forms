import { z } from 'zod';

export const contactsSchema = z.object({
  firstName: z
    .string({
      message: 'Обязательное поле',
    })
    .trim()
    .min(1, 'Слишком короткое имя'),
  middleName: z.optional(z.string().trim().min(1, 'Слишком короткое отчество')),
  lastName: z
    .string({
      message: 'Обязательное поле',
    })
    .trim()
    .min(1, 'Слишком короткая фамилия'),
  phoneNumber: z
    .string({
      message: 'Обязательное поле',
    })
    .regex(/7\d{10}/, 'Некоректный номер телефона'),
  email: z.optional(z.string().email('Некоректный Email')),
  luboiDvij: z
    .boolean({
      message: 'Ты обязан быть за любой движ',
    })
    .refine((check) => check, 'Ты обязан быть за любой движ'),
});

export type ContactsFormFields = z.infer<typeof contactsSchema>;
