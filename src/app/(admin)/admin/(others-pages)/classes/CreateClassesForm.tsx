"use client";

import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/form/input/InputField';
import Button from '@/components/ui/button/Button'
import { Modal } from '@/components/ui/modal';
import { useModal } from '@/hooks/useModal';
import { type CreateClassPayload, CreateClassSchema } from './Classes.helpers';
import Select from '@/components/form/Select';
import MultiSelect from '@/components/form/MultiSelect';
import TextArea from '@/components/form/input/TextArea';

const optionsTeacher = [
  { value: "thomas sankara", label: "Thomas Sankara" },
  { value: "badmus john", label: "Badmus John" },
  { value: "Justin Tom", label: "Justin Tom" },
];

const subjectsOptions = [
  { value: "mathematics", text: "Mathematics", selected: false },
  { value: "english", text: "English", selected: false },
  { value: "physics", text: "Physics", selected: false },
  { value: "economics", text: "Economics", selected: false },
  { value: "commerce", text: "Commerce", selected: false },
];
const CreateClassForm = () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const { isOpen, openModal, closeModal } = useModal();
  const {
        handleSubmit,
        // setValue,
        register,
        // clearErrors,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(CreateClassSchema),
    });

    const onSubmit = useCallback(
        (payload: CreateClassPayload) => {
      closeModal();
      console.error(payload)
        },
        [ closeModal]
    );

  const handleSelectTeacher = (value: string) => {
    console.log("Selected value:", value);
  };

  return (
    <div className='w-full pb-5'>
        <div className='flex justify-end'>
          <Button onClick={openModal}>Add New Class</Button>
        </div>
        <Modal isOpen={isOpen}
                onClose={closeModal}
        className="max-w-[700px] p-6 lg:p-10"
        >
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Add New Class
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Please enter details of the Class
            </p>
          </div>
          <form className='flex flex-col gap-y-4' onSubmit={handleSubmit(onSubmit)}>
            <Input placeholder='Class name' register={register("name")} error={errors.name?.message ? true : false} />
          <Select
              options={optionsTeacher}
              placeholder="Select Teacher"
              onChange={handleSelectTeacher}
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

export default CreateClassForm
