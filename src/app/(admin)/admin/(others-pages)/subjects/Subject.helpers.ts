import * as yup from 'yup';

export const CreateSubjectSchema = yup.object({
    name: yup.string().required(),
    code: yup.string(),
    description: yup.string().required(),
});

export type CreateClassPayload = yup.InferType<typeof CreateSubjectSchema>;