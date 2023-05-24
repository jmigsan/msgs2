import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { trpc } from '../../utils/trpc';
import { signIn, signOut, useSession } from 'next-auth/react';

// fix to turn into usestate instead of any later
const ChatList = ({ setCurrentChatId }: any, { currentChatId }: any) => {
  const chats = trpc.chat.getChats.useQuery();
  const currentUsername = trpc.user.getUsername.useQuery();

  return (
    <>
      <Text pt={2}>Your Conversations</Text>
      <Box h={'sm'} pt={2} overflowY={'scroll'}>
        <Stack>
          {chats.data?.map((chat) => (
            <Box key={chat.chatId}>
              <Button
                onClick={() => setCurrentChatId(chat.chatId)}
                bg={'yellow.100'}
                colorScheme={'yellow'}
              >
                {chat.users.length === 1 ? chat.users[0]?.username : ''}
                {chat.users[0]?.username === currentUsername.data
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
