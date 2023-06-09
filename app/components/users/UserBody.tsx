"use client";

import CustomAvatar from "../ui/CustomAvatar";
import Button from "../ui/CustomButton";
import { User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillSetting } from "react-icons/ai";

interface UserBodyProps {
  user: User;
  profile?: boolean;
}

const UserBody: React.FC<UserBodyProps> = ({ user, profile }) => {
  const router = useRouter();
  const [iSLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/chat", {
        userId: user.id,
      })
      .then((data) => router.push(`/chats/${data.data.id}`))
      .catch((error) => toast.error("Something went wrong"))
      .finally(() => setIsLoading(false));
  }, [router, user.id]);

  return (
    <div className='relative border-2 border-gray-200 rounded-xl mt-4'>
      <div className='flex flex-col gap-2 px-4 py-8'>
        <div className='mb-4 z-10 grow-0 bg-white w-min p-1 rounded-full'>
          <CustomAvatar currentUser={user} size={130} />
        </div>
        <div className='text-2xl font-bold'>{user.name}</div>
        <div>{user.email}</div>
        <div className='flex gap-4'>
          <Button
            disabled={iSLoading}
            label={"Message"}
            onClick={sendMessage}
          />
          <Button
            outline
            label={"Share profile"}
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.host}/users/${user.id}`
              );
              toast.success("Copied");
            }}
          />
        </div>
      </div>
      <div className='absolute bottom-2/3 w-full h-1/3'>
        <Image
          className='rounded-t-xl object-cover'
          fill
          src={"/images/profile-bg.jpg"}
          alt='profile-bg'
        />
      </div>
      {profile && (
        <div
          onClick={() => router.push("/profile/edit")}
          className='absolute right-4 top-4 cursor-pointer'
        >
          <AiFillSetting size={32} />
        </div>
      )}
    </div>
  );
};

export default UserBody;
