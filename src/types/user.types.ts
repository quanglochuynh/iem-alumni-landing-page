import z from 'zod';
import type { File } from '@/features/gallery/album.type';
import { registerFormSchema } from '@/features/register/register.schema';

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

export type MeResponse = Omit<UserSession, 'avatar'> & {
  avatar: File | null;
  clientCode: string;
};
