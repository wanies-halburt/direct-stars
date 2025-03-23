"use client";

import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/form/input/InputField';
import Button from '@/components/ui/button/Button'
import { Modal } from '@/components/ui/modal';
import { useModal } from '@/hooks/useModal';
import { type CreateTeacherPayload, CreateTeacherSchema } from './Teachers.helpers';
import { EnvelopeIcon } from '@/icons';
import Select from '@/components/form/Select';
import MultiSelect from '@/components/form/MultiSelect';
import TextArea from '@/components/form/input/TextArea';

const optionsGender = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Others" },
];

const subjectsOptions = [
  { value: "mathematics", text: "Mathematics", selected: false },
  { value: "english", text: "English", selected: false },
  { value: "physics", text: "Physics", selected: false },
  { value: "economics", text: "Economics", selected: false },
  { value: "commerce", text: "Commerce", selected: false },
];
const CreateTeacherForm = () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const { isOpen, openModal, closeModal } = useModal();
  const {
		handleSubmit,
		// setValue,
		register,
		// clearErrors,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(CreateTeacherSchema),
	});

	const onSubmit = useCallback(
		(payload: CreateTeacherPayload) => {
      closeModal();
      console.error(payload)
		},
		[ closeModal]
	);

  const handleSelectGender = (value: string) => {
    console.log("Selected value:", value);
  };

  return (
    <div className='w-full pb-5'>
        <div className='flex justify-end'>
          <Button onClick={openModal}>Add New Teacher</Button>
        </div>
        <Modal isOpen={isOpen}
                onClose={closeModal}
        className="max-w-[700px] p-6 lg:p-10"
        >
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Add New Teacher
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Please enter details of the teacher
            </p>
          </div>
          <form className='flex flex-col gap-y-4' onSubmit={handleSubmit(onSubmit)}>
            <Input placeholder='Name' register={register("name")} error={errors.name?.message ? true : false} />
            <Input placeholder='Phone number' register={register("phoneNumber")} error={errors.name?.message ? true : false} />
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
              options={optionsGender}
              placeholder="Select Gender"
              onChange={handleSelectGender}
              defaultValue=""
              className="bg-gray-50 dark:bg-gray-800"
            />
                    <div className="relative">
          <MultiSelect
            label="Assign subjects"
            options={subjectsOptions}
            // defaultSelected={["1", "3"]}
            onChange={(values) => setSelectedValues(values)}
          />
          <p className="sr-only">
            Selected Values: {selectedValues.join(", ")}
          </p>
        </div>
        <TextArea              
         placeholder="Type your message here..."
              rows={6}
          register={register("description")}
              className=" bg-gray-50 dark:bg-gray-800"
               />
               <Button>Submit</Button>
          </form>
        </Modal>
    </div>
  )
}

export default CreateTeacherForm
