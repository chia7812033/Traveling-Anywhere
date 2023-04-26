"use client";

import CustomAvatar from "../CustomAvatar";
import MenuItem from "./MenuItem";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { HiBars3 } from "react-icons/hi2";
import { RiGlobalLine } from "react-icons/ri";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const [isClick, setIsClick] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsClick((state) => !state);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className='relative'>
      <div
        className='
          flex
          flex-row
          items-center
          gap-3
          cursor-pointer'
      >
        <div
          onClick={onRent}
          className='
            hidden
            lg:block
            rounded-full
            hover:bg-gray-100
            transition
            px-3
            py-2'
        >
          Airbnb your home
        </div>
        <RiGlobalLine
          size={40}
          className='
            hidden
            md:block
          hover:bg-gray-100
            transition
            rounded-full
            p-2'
        />
        <div
          onClick={toggleOpen}
          className='
            flex
            flex-row
            border
            rounded-full
            lg:p-3
            lg:py-2
            md:p-2
            p-1
            hover:shadow-md
            transition
            gap-2
            items-center'
        >
          <HiBars3 size={26} className='' />
          <div className='hidden md:block'>
            <CustomAvatar currentUser={currentUser} />
          </div>
        </div>
      </div>

      {isClick && (
        <div
          className='
            absolute
            right-0
            w-[40vm]
            md:w-3/4
            shadow-md
            border-[1px]
            rounded-xl
            flex
            flex-col
            bg-white
            py-2
            mt-2
            text-sm'
        >
          {currentUser ? (
            <>
              <MenuItem
                onClick={() => router.push("/trips")}
                label={"My trips"}
              />
              <MenuItem
                onClick={() => router.push("/favorites")}
                label={"My favorites"}
              />
              <MenuItem
                onClick={() => router.push("./reservations")}
                label={"My reservations"}
              />
              <MenuItem
                onClick={() => router.push("./properties")}
                label={"My properties"}
              />
              <MenuItem
                onClick={() => {
                  signOut();
                  toast.success("Logged out successfully");
                  router.push("/");
                }}
                label={"Logout"}
                isBold={true}
              />
            </>
          ) : (
            <>
              <MenuItem
                onClick={registerModal.onOpen}
                label={"Sign up"}
                isBold
              />
              <MenuItem onClick={loginModal.onOpen} label={"Log in"} />
            </>
          )}
          <div className='border-b-[1px] my-2' />
          <MenuItem onClick={rentModal.onOpen} label={"Airbnb your home"} />
          <MenuItem onClick={() => {}} label={"Help"} />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
