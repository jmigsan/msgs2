import { Button, Text } from '@chakra-ui/react';
import { trpc } from '../../utils/trpc';

// fix to turn into usestate later
const ChatList = (setCurrentChatId: any) => {
  const chats = trpc.chat.getChats.useQuery();

  return (
    <>
      <Text>Your Chats</Text>
      {chats.data?.map((chat) => (
        <Button onClick={() => setCurrentChatId(chat.chatId)}>
          {chat.chatId}
        </Button>
      ))}
    </>
  );
};
export default ChatList;
