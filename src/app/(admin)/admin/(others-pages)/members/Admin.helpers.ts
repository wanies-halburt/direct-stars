import * as yup from 'yup';

export const CreateAdminSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().required(),
    role: yup.string().required(),
});

export type CreateAdminPayload = yup.InferType<typeof CreateAdminSchema>;