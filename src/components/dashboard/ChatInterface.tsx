import { Box, Stack, Text } from '@chakra-ui/react';
import { trpc } from '../../utils/trpc';
import DisplayMessages from './ChatInterface/DisplayMessages';
import SendMessage from './ChatInterface/SendMessage';
import { signIn, signOut, useSession } from 'next-auth/react';

const ChatInterface = ({ currentChatId }: any) => {
  const { data: sessionData } = useSession();
  const chat = trpc.chat.getChat.useQuery({ chatId: currentChatId });

  if (chat.data) {
    return (
      <Box>
        <Text>
          {chat.data.users[0]?.username === sessionData?.user?.username
            ? chat.data.users[1]?.username
            : chat.data.users[0]?.username}
        </Text>
        {currentChatId !== '' ? (
          <DisplayMessages currentChatId={currentChatId} />
        ) : (
          <></>
        )}
        {currentChatId !== '' ? (
          <SendMessage currentChatId={currentChatId} />
        ) : (
          <></>
        )}
      </Box>
    );
  } else {
    return <></>;
  }
};
export default ChatInterface;
