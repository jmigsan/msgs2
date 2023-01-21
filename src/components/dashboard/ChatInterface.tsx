import { Box, Stack, Text } from '@chakra-ui/react';
import { trpc } from '../../utils/trpc';
import DisplayMessages from './ChatInterface/DisplayMessages';
import SendMessage from './ChatInterface/SendMessage';
import { signIn, signOut, useSession } from 'next-auth/react';
import ChatName from './ChatInterface/ChatName';

const ChatInterface = ({ currentChatId }: any) => {
  const { data: sessionData } = useSession();
  const chat = trpc.chat.getChat.useQuery({ chatId: currentChatId });

  // if (chat.data) {
  return (
    <Box>
      <ChatName chat={chat} />
      <DisplayMessages currentChatId={currentChatId} />
      <SendMessage currentChatId={currentChatId} />
    </Box>
  );
};
export default ChatInterface;
