import { Box, Stack, Text } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';

const ChatName = ({ chat }: { chat: any }) => {
  const { data: sessionData } = useSession();

  console.log(chat.data);

  // == because hits null, undefined, etc.
  if (chat.data == undefined) {
    return <Box h={6} />;
  }

  return (
    <Box m={3} p={3} bg={'yellow.100'} rounded={'lg'}>
      <Text>
        {chat.data.users.length === 1 ? chat.data.users[0]?.username : ''}
        {chat.data.users[0]?.username === sessionData?.user?.username
          ? chat.data.users[1]?.username
          : chat.data.users[0]?.username}
      </Text>
    </Box>
  );
};
export default ChatName;
