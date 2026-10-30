import z from 'zod';
import { fileRecordSchema } from '@/schemas/file.schema';
import { createMediaArraySchema } from '@/schemas/media-schema.zod';

const socialProfileSchema = z
  .union([z.url({ protocol: /^https?$/ }), z.literal('')])
  .optional();

export const registerFormSchema = z.object({
  name: z.string().min(1).max(100),
  password: z.string().min(6).max(100),
  confirmPassword: z.string().min(6).max(100),
  email: z.email(),
  phone: z.string().min(10).max(15),
  bio: z.string().max(500).optional(),
  facebookProfile: socialProfileSchema,
  linkedinProfile: socialProfileSchema,
  studentId: z.string().min(1).max(20),
});

export const registerFormSchemaWithRefine = registerFormSchema.refine(
  (data) => data.password === data.confirmPassword,
  { path: ['confirmPassword'] },
);

export type RegisterFormData = z.infer<typeof registerFormSchema>;

export const registerFormInitialValues: RegisterFormData = {
  name: '',
  password: '',
  confirmPassword: '',
  email: '',
  phone: '',
  bio: '',
  facebookProfile: '',
  linkedinProfile: '',
  studentId: '',
};

export const updateProfileFormSchemaClient = registerFormSchema
  .partial()
  .omit({
    studentId: true,
    password: true,
    confirmPassword: true,
  })
  .extend({
    id: z.cuid2(),
    password: z.string().min(6).max(100).or(z.literal('')),
    confirmPassword: z.string().min(6).max(100).or(z.literal('')),
    avatar: createMediaArraySchema({ min: 0, max: 1 }),
  });

export const updateProfileFormSchemaClientWithRefine =
  updateProfileFormSchemaClient.refine(
    (data) => data.password === data.confirmPassword,
    { path: ['confirmPassword'] },
  );

export type UpdateProfileFormDataClient = z.infer<
  typeof updateProfileFormSchemaClient
>;

export const updateProfileFormInitialValues: UpdateProfileFormDataClient = {
  id: '',
  name: '',
  password: '',
  confirmPassword: '',
  avatar: [],
  facebookProfile: '',
  linkedinProfile: '',
};

export const updateProfileFormSchemaServer = updateProfileFormSchemaClient
  .omit({
    avatar: true,
    confirmPassword: true,
  })
  .extend({
    avatar: fileRecordSchema.nullable(),
  });

export type UpdateProfileFormDataServer = z.infer<
  typeof updateProfileFormSchemaServer
>;
