import { z } from 'zod';
import dayjs from 'dayjs';
export const projectSchema = z
  .object({
    name: z.string().trim().min(1, 'Обязательное поле'),
    skills: z.string().array().nonempty('Укажи хотя бы один навык плз'),
    role: z.string().min(1, 'Обязательное поле'),
    beginDate: z
      .string({
        message: 'Дату когда стартуем введи',
      })
      .regex(/\d{2}.\d{2}.\d{4}/, 'Некоректная дата')
      .length(10, 'Некоректная дата'),
    endDate: z.optional(
      z
        .string()
        .regex(/\d{2}.\d{2}.\d{4}/)
        .length(10, 'Некоректная дата'),
    ),
  })
  .superRefine((arg, ctx) => {
    const { beginDate, endDate } = arg;
    if (!endDate) {
      return;
    }

    const begin = dayjs(beginDate, 'DD.MM.YYYY').valueOf();
    const end = dayjs(endDate, 'DD.MM.YYYY').valueOf();

    if (end - begin < 0) {
      ctx.addIssue({
        path: ['endDate'],
        code: z.ZodIssueCode.custom,
        message: 'Дата завершения не может быть раньше даты начала',
      });
    }
  });

export type ProjectFormFields = z.infer<typeof projectSchema>;
