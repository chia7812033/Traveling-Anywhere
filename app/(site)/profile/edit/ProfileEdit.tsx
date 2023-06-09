"use client";

import Input from "@/app/components/inputs/Input";
import Container from "@/app/components/ui/Container";
import CustomButton from "@/app/components/ui/CustomButton";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ProfileEditProps {
  user: User;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ user }) => {
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: user.name,
      email: user.email,
      image: user.image,
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .patch("/api/register", data)
      .then(() => {
        toast.success("Update profile successfully");
        router.push("/profile");
      })
      .catch((error) => toast.error("Something went wrong"))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container>
      <div className='w-full md:w-2/3 lg:w-1/3'>
        <Input
          id={"name"}
          label='Name'
          register={register}
          errors={errors}
          required
        />
        {errors.name && <span className='text-red-500'>Name is required</span>}

        <Input
          id={"email"}
          label='Email'
          register={register}
          errors={errors}
          required
        />
        {errors.email && (
          <span className='text-red-500'>Email is required</span>
        )}

        <Input
          id={"image"}
          label='Image URL'
          register={register}
          errors={errors}
        />

        <CustomButton
          label='Save'
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        />
      </div>
    </Container>
  );
};

export default ProfileEdit;
