import * as yup from 'yup';

export const CreateSubjectSchema = yup.object({
    title: yup.string().required(),
    code: yup.string().required(),
    description: yup.string().required(),
    createdBy: yup.string().required(),
});

export type CreateSubjectPayload = yup.InferType<typeof CreateSubjectSchema>;