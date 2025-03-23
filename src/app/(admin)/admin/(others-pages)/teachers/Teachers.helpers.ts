import * as yup from 'yup';

export const CreateTeacherSchema = yup.object({
	name: yup.string().required(),
	phoneNumber: yup.string().required(),
	email: yup.string().required(),
	description: yup.string().required(),
	permissions: yup.array().of(yup.string().required()).required(),
	roleId: yup.string().required(),
    // classAssigned: yup.array().of(yup.string().required()).required(),
    subjects: yup.array().of(yup.string().required()).required(),
});

export type CreateTeacherPayload = yup.InferType<typeof CreateTeacherSchema>;