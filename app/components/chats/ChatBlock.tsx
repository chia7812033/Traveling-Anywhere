import ChatHeading from "./ChatHeading";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { ChatType } from "@/app/types";
import { User } from "@prisma/client";
import { useMemo } from "react";

interface ChatBlockProps {
  chat: ChatType;
  currentUser: User;
}

const ChatBlock: React.FC<ChatBlockProps> = ({ chat, currentUser }) => {
  const user = useMemo(
    () => chat.users.filter((item) => item.id != currentUser.id),
    [chat.users, currentUser.id]
  );

  return (
    <div className='px-4 py-2 w-full flex flex-col h-full'>
      <ChatHeading currentUser={user[0]} />
      <div className='flex-1 h-full flex flex-col'>
        <ChatMessages messages={chat.messages} currentUser={currentUser} />
        <ChatInput chatId={chat.id} />
      </div>
    </div>
  );
};

export default ChatBlock;
