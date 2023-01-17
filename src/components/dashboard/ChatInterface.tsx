import { Box, Stack, Text } from '@chakra-ui/react';
import { trpc } from '../../utils/trpc';
import DisplayMessages from './ChatInterface/DisplayMessages';
import SendMessage from './ChatInterface/SendMessage';

const ChatInterface = ({ currentChatId }: any) => {
  const chat = trpc.chat.getChat.useQuery({ chatId: currentChatId });

  return (
    <Box>
      <Text>{currentChatId}</Text>
      <DisplayMessages currentChatId={currentChatId} />
      {currentChatId !== '' ? (
        <SendMessage currentChatId={currentChatId} />
      ) : (
        <></>
      )}
    </Box>
  );
};
export default ChatInterface;
