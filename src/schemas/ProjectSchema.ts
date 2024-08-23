import { z } from 'zod';
export const projectSchema = z
  .object({
    name: z
      .string({
        message: 'Обязательное поле',
      })
      .trim()
      .min(1, 'Слишком короткое название прокта'),
    skills: z
      .array(z.string().trim(), {
        message: 'Укажи хотя бы один навык плз',
      })
      .nonempty(),
    role: z.string({
      message: 'Обязательное поле',
    }),
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
