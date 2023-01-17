import { Box, Stack, Text } from '@chakra-ui/react';
import { trpc } from '../../utils/trpc';
import SendMessage from './SendMessage';

const ChatInterface = ({ currentChatId }: any) => {
  const chat = trpc.chat.getChat.useQuery({ chatId: currentChatId });

  return (
    <Box>
      <Text>{currentChatId}</Text>

      {currentChatId !== '' ? (
        <SendMessage currentChatId={currentChatId} />
      ) : (
        <></>
      )}
    </Box>
  );
};
export default ChatInterface;
