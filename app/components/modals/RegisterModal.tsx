"use client";

import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState, useCallback } from "react";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const body = (
    <div className='flex flex-col gap-4'>
      <Heading title={"Welcome to Airbnb"} subtitle='Create an account!' />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='Password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type='password'
      />
    </div>
  );

  const footer = (
    <div>
      <hr />
      <Button
        outline
        label={"Continue with Google"}
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label={"Continue with GitHub"}
        icon={FaGithub}
        onClick={() => {}}
      />
      <div
        className='
            text-neutral-500
            text-center
            mt-4
            font-light'
      >
        <div className='flex gap-2 justify-center'>
          <div>Already have an account?</div>
					<div
						onClick={() => {}}
            className='
              hover:text-black
              hover:underline
              hover:font-semibold
              transition:
              cursor-pointer'
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title={"Register"}
      actionLabel={"Continue"}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={body}
      footer={footer}
    />
  );
};

export default RegisterModal;