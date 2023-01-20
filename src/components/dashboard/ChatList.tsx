import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { trpc } from '../../utils/trpc';
import { signIn, signOut, useSession } from 'next-auth/react';

// fix to turn into usestate later
const ChatList = ({ setCurrentChatId }: any, { currentChatId }: any) => {
  const { data: sessionData } = useSession();
  const chats = trpc.chat.getChats.useQuery();
  console.log(currentChatId);

  return (
    <>
      <Box h={'md'} pt={2}>
        <Stack>
          <Text>Your Conversations</Text>
          {chats.data?.map((chat) => (
            <Box key={chat.chatId}>
              <Button onClick={() => setCurrentChatId(chat.chatId)}>
                {chat.users.length === 1 ? chat.users[0]?.username : ''}
                {chat.users[0]?.username === sessionData?.user?.username
                  ? chat.users[1]?.username
                  : chat.users[0]?.username}
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );
};
export default ChatList;
