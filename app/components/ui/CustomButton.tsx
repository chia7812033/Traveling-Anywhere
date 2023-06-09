"use client";

import { Button } from "@mui/material";
import { IconType } from "react-icons";

interface CustomButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  wFull?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  wFull,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
      flex
      justify-center
      relative
      disabled:opacity-70
      disabled:cursor-not-allowed
      rounded-lg
      hover:opacity-80
      transition
      ${wFull ? "w-full" : "px-2"}
      mt-2
      mb-1
      ${outline ? `bg-black` : "bg-orange-500"}
      text-white
      ${small ? "py-1" : "py-3"}
      ${small ? "text-sm" : "text-md"}
      ${small ? "font-light" : "font-semibold"}
      `}
    >
      {Icon && <Icon size={24} className='absolute left-3 top-3' />}
      <div>{label}</div>
    </button>
  );
};

export default CustomButton;
