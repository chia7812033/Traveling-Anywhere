"use client";

import Input from "@/app/components/inputs/Input";
import CustomButton from "@/app/components/ui/CustomButton";
import Heading from "@/app/components/ui/Heading";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BsGithub, BsGoogle } from "react-icons/bs";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
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

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => {
          signIn("credentials", {
            ...data,
          });
          router.push("/");
        })
        .then((callback) => {})
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok) {
            router.push("/");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!");
        }

        if (callback?.ok) {
          router.push("/");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div
        className='
        bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        '
      >
        <Heading title={variant} />
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id='name'
              label='Name'
            />
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id='email'
            label='Email address'
            type='email'
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id='password'
            label='Password'
            type='password'
          />
          <div>
            <CustomButton
              disabled={isLoading}
              wFull
              onClick={handleSubmit(onSubmit)}
              label={variant === "LOGIN" ? "Sign in" : "Register"}
            />
          </div>
        </form>

        <div className='mt-6'>
          <div className='relative'>
            <div
              className='
                absolute
                inset-0
                flex
                items-center
              '
            >
              <div className='w-full border-t border-gray-300' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-white px-2 text-gray-500'>
                Or continue with
              </span>
            </div>
          </div>

          <div className='mt-6 flex gap-2'>
            <CustomButton
              label='Google'
              icon={BsGoogle}
              wFull
              onClick={() => socialAction("google")}
            />
            <CustomButton
              label='Github'
              icon={BsGithub}
              wFull
              onClick={() => socialAction("github")}
            />
          </div>
        </div>
        <div
          className='
            flex
            gap-2
            justify-center
            text-sm
            mt-6
            px-2
            text-gray-500
          '
        >
          <div onClick={toggleVariant} className='underline cursor-pointer'>
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
