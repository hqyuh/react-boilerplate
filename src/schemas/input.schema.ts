import { z } from 'zod';

export const InfoFormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  })
});

export type TInfoFormValues = z.infer<typeof InfoFormSchema>;
