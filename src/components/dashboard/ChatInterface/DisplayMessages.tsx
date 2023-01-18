import { Box, Stack, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { trpc } from '../../../utils/trpc';

const DisplayMessages = ({ currentChatId }: any) => {
  const chatMessages = trpc.chat.getMessages.useQuery(
    { chatId: currentChatId },
    { refetchInterval: 1000 }
  );
  const { data: sessionData } = useSession();

  console.log(chatMessages.data);

  return (
    <Box>
      <Box
        h={'md'}
        overflowY={'scroll'}
        display={'flex'}
        flexDirection={'column-reverse'}
      >
        <Stack>
          {chatMessages.data?.map((message) => (
            <Box key={message.msgId}>
              <Box
                p={3}
                float={
                  message.userId === sessionData?.user?.id ? 'right' : 'left'
                }
                bgColor={
                  message.userId === sessionData?.user?.id
                    ? 'blue.300'
                    : 'gray.300'
                }
              >
                <Text>{message.message}</Text>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};
export default DisplayMessages;
