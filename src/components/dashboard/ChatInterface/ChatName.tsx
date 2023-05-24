import { Box, Stack, Text } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { trpc } from '../../../utils/trpc';

const ChatName = ({ chat }: { chat: any }) => {
  const currentUsername = trpc.user.getUsername.useQuery();

  // == because hits null, undefined, etc.
  if (chat.data == undefined) {
    return <Box m={3} p={6} h={6} />;
  }

  return (
    <Box m={3} p={3} bg={'yellow.100'} rounded={'xl'}>
      <Text fontWeight={'semibold'}>
        {chat.data.users.length === 1 ? chat.data.users[0]?.username : ''}
        {chat.data.users[0]?.username === currentUsername.data
          ? chat.data.users[1]?.username
          : chat.data.users[0]?.username}
      </Text>
    </Box>
  );
};
export default ChatName;
