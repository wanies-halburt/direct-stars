import * as yup from 'yup';

export const CreateClassSchema = yup.object({
    name: yup.string().required(),
        description: yup.string().required(),
    teacherAssigned: yup.string().required(),
    subjects: yup.array().of(yup.string().required()).required(),
});

export type CreateClassPayload = yup.InferType<typeof CreateClassSchema>;