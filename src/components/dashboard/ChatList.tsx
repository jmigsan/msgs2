import { Box, Button, Text } from '@chakra-ui/react';
import { trpc } from '../../utils/trpc';

// fix to turn into usestate later
const ChatList = ({ setCurrentChatId }: any) => {
  const chats = trpc.chat.getChats.useQuery();

  return (
    <>
      <Text>Your Chats</Text>
      {chats.data?.map((chat) => (
        <Box key={chat.chatId}>
          <Button onClick={() => setCurrentChatId(chat.chatId)}>
            {chat.chatId}
          </Button>
        </Box>
      ))}
    </>
  );
};
export default ChatList;
