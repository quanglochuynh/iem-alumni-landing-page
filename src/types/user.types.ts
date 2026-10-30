import z from 'zod';
import { registerFormSchema } from '@/features/register/register.schema';
import type { TFileRecord } from '@/schemas/file.schema';

export const userSessionSchema = registerFormSchema
  .omit({
    password: true,
    confirmPassword: true,
  })
  .extend({
    id: z.uuid(),
  });

export type UserSession = z.infer<typeof userSessionSchema>;

export type LoginResponse = {
  message: string;
  user?: {
    id: string;
    studentId: string;
    name: string;
  };
  refreshToken?: string | null;
};

export type AuthJWTPayload = {
  userId: string;
};

export type RefreshTokenResponse = {
  message: string;
  refreshToken: string;
};

export type ContactResponse = {
  name: string;
  avatar: TFileRecord | null;
  isAuthenticated: boolean;
  details?: {
    email: string;
    phone: string;
    studentId: string;
    bio?: string;
    facebookProfile?: string;
    linkedinProfile?: string;
  };
};

export type MeResponse = Omit<UserSession, 'avatar'> & {
  avatar: TFileRecord | null;
  clientCode: string;
};
