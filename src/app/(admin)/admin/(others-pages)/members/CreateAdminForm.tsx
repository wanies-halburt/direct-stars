"use client";

import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import toast from "react-hot-toast";
import Input from '@/components/form/input/InputField';
import Button from '@/components/ui/button/Button'
import { Modal } from '@/components/ui/modal';
import { useModal } from '@/hooks/useModal';
import { type CreateAdminPayload, CreateAdminSchema } from './Admin.helpers';
import { EnvelopeIcon } from '@/icons';
import Select from '@/components/form/Select';

const optionsRoles = [
  { value: "superAdmin", label: "superAdmin" },
  { value: "principal", label: "principal" },
];

const CreateAdminForm = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const {
		handleSubmit,
		setValue,
		register,
		// clearErrors,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(CreateAdminSchema),
	});

	const onSubmit = useCallback(
		async (payload: CreateAdminPayload) => {
      console.log("payload", payload);
      const res = await axios.post(`/api/register-admin`, payload);
      console.log("response", res)
      toast.success(res.data?.message || "User has been added");
      closeModal();
		},
		[ closeModal]
	);

  const handleSelectRole = (value: string) => {
    setValue("role", value)
  };

  return (
    <div className='w-full pb-5'>
        <div className='flex justify-end'>
          <Button onClick={openModal}>Add New Admin</Button>
        </div>
        <Modal isOpen={isOpen}
                onClose={closeModal}
        className="max-w-[700px] p-6 lg:p-10"
        >
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Add New Admin
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Please enter details of the user
            </p>
          </div>
          <form className='flex flex-col gap-y-4' onSubmit={handleSubmit(onSubmit)}>
            <Input placeholder='First Name' register={register("firstName")} error={errors.firstName?.message ? true : false} />
            <Input placeholder='Last Name' register={register("lastName")} error={errors.lastName?.message ? true : false} />
            <Input placeholder='Phone number' register={register("phone")} error={errors.phone?.message ? true : false} />
            <div className="relative">
            <Input
            placeholder='Email' 
            register={register("email")}
             type='email'
              className="pl-[62px]"
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <EnvelopeIcon />
            </span>
          </div>
          <Select
              options={optionsRoles}
              placeholder="Select Role"
              onChange={handleSelectRole}
              defaultValue=""
              className="bg-gray-50 dark:bg-gray-800"
            />
               <Button>Submit</Button>
          </form>
        </Modal>
    </div>
  )
}

export default CreateAdminForm
