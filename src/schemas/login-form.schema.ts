import { z } from 'zod';

export const createLoginFormSchema = (messages: {
  invalidStudentId: string;
  invalidPassword: string;
}) =>
  z.object({
    studentId: z.string().trim().min(3, messages.invalidStudentId),
    password: z.string().min(6, messages.invalidPassword),
    keepMeLoggedIn: z.boolean(),
  });

export type LoginFormData = z.infer<ReturnType<typeof createLoginFormSchema>>;

export const loginFormInitialValues: LoginFormData = {
  studentId: '',
  password: '',
  keepMeLoggedIn: true,
};
