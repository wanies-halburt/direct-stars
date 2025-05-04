"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import {
  type CreateSubjectPayload,
  CreateSubjectSchema,
} from "./Subject.helpers";
import { useAdminAuthStore } from "@/store/AdminAuthStore";

const CreateSubjectForm = () => {
  const { createSubject, loading, user } = useAdminAuthStore();
  const { isOpen, openModal, closeModal } = useModal();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      createdBy: user?._id ?? "",
    },
    resolver: yupResolver(CreateSubjectSchema),
  });

  const onSubmit = useCallback(
    async (payload: CreateSubjectPayload) => {
      try {
        const response = await createSubject(payload);
        if (response) {
          reset();
          closeModal();
        }
      } catch (error) {
        console.error(error);
      }
    },
    [closeModal, createSubject, reset]
  );

  return (
    <div className="w-full pb-5">
      <div className="flex justify-end">
        <Button onClick={openModal}>Add New Subject</Button>
      </div>
      <Modal
        isOpen={isOpen}
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
        <form
          className="flex flex-col gap-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            placeholder="Subject Title"
            register={register("title")}
            error={errors.title?.message ? true : false}
          />
          <Input
            placeholder="Subject Code"
            register={register("code")}
            error={errors.code?.message ? true : false}
          />
          <textarea
            placeholder="Enter Subject Description here"
            rows={6}
            {...register("description")}
            className="w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden bg-gray-50 dark:bg-gray-800"
          />

          <Button disabled={loading}>
            {loading ? "loading..." : "Create"}
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default CreateSubjectForm;
