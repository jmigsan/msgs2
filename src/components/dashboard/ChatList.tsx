import { Box, Button, Text } from '@chakra-ui/react';
import { trpc } from '../../utils/trpc';
import { signIn, signOut, useSession } from 'next-auth/react';

// fix to turn into usestate later
const ChatList = ({ setCurrentChatId }: any, { currentChatId }: any) => {
  const { data: sessionData } = useSession();
  const chats = trpc.chat.getChats.useQuery();
  console.log(currentChatId);

  return (
    <>
      <Text>Your Conversations</Text>
      <div>{currentChatId}</div>
      {chats.data?.map((chat) => (
        <Box key={chat.chatId}>
          <Button onClick={() => setCurrentChatId(chat.chatId)}>
            {chat.users[0]?.username === sessionData?.user?.username
              ? chat.users[1]?.username
              : chat.users[0]?.username}
          </Button>
        </Box>
      ))}
    </>
  );
};
export default ChatList;
