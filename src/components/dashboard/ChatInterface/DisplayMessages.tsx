import { Box, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { trpc } from '../../../utils/trpc';

const DisplayMessages = ({ currentChatId }: any) => {
  const chatMessages = trpc.chat.getMessages.useQuery({
    chatId: currentChatId,
  });
  const { data: sessionData } = useSession();

  return (
    <Box>
      {chatMessages.data?.map((message) => (
        <Box
          key={message.msgId}
          p={3}
          alignSelf={message.userId === sessionData?.user?.id ? 'end' : 'start'}
          bgColor={
            message.userId === sessionData?.user?.id ? 'blue.300' : 'gray.300'
          }
        >
          <Text>{message.message}</Text>
        </Box>
      ))}
    </Box>
  );
};
export default DisplayMessages;
