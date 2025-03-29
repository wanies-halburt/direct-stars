"use client";

import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/form/input/InputField';
import Button from '@/components/ui/button/Button'
import { Modal } from '@/components/ui/modal';
import { useModal } from '@/hooks/useModal';
import { type CreateClassPayload, CreateSubjectSchema } from './Subject.helpers';
import TextArea from '@/components/form/input/TextArea';


const CreateSubjectForm = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const {
        handleSubmit,
        // setValue,
        register,
        // clearErrors,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(CreateSubjectSchema),
    });

    const onSubmit = useCallback(
        (payload: CreateClassPayload) => {
      closeModal();
      console.error(payload)
        },
        [ closeModal]
    );


  return (
    <div className='w-full pb-5'>
        <div className='flex justify-end'>
          <Button onClick={openModal}>Add New Subject</Button>
        </div>
        <Modal isOpen={isOpen}
                onClose={closeModal}
        className="max-w-[700px] p-6 lg:p-10"
        >
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Add New Subject
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Please enter details of the Subject
            </p>
          </div>
          <form className='flex flex-col gap-y-4' onSubmit={handleSubmit(onSubmit)}>
            <Input placeholder='Subject title' register={register("name")} error={errors.name?.message ? true : false} />
            <Input placeholder='Subject Code' register={register("code")} error={errors.code?.message ? true : false} />
        <TextArea              
         placeholder="Type your message here..."
              rows={6}
          register={register("description")}
              className=" bg-gray-50 dark:bg-gray-800"
               />
               <Button>Create</Button>
          </form>
        </Modal>
    </div>
  )
}

export default CreateSubjectForm
