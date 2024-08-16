import { z } from 'zod';
export const projectSchema = z
  .object({
    name: z.string().trim().min(1, 'Обязательное поле'),
    skills: z.string().array().nonempty('Укажи хотя бы один навык плз'),
    role: z.string().min(1, 'Обязательное поле'),
    beginDate: z.date({
      message: 'Дату когда стартуем введи',
    }),
    endDate: z.optional(
      z.date({
        message: 'Начал вводить - вводи до конца',
      }),
    ),
  })
  .superRefine((arg, ctx) => {
    const { beginDate, endDate } = arg;
    if (!endDate) {
      return;
    }

    if (endDate < beginDate) {
      ctx.addIssue({
        path: ['endDate'],
        code: z.ZodIssueCode.custom,
        message: 'Дата завершения не может быть раньше даты начала',
      });
    }
  });

export type ProjectFormFields = z.infer<typeof projectSchema>;
