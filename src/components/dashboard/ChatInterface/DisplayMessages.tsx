import { Box, Stack, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { trpc } from '../../../utils/trpc';

const DisplayMessages = ({ currentChatId }: any) => {
  const chatMessages = trpc.chat.getMessages.useQuery(
    { chatId: currentChatId },
    { refetchInterval: 1000 }
  );
  const { data: sessionData } = useSession();

  if (currentChatId === undefined) {
    return (
      <Box>
        <Box
          w={'2xl'}
          h={'md'}
          overflowY={'scroll'}
          display={'flex'}
          flexDirection={'column-reverse'}
        ></Box>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        w={{ base: 'md', lg: '2xl' }}
        h={'md'}
        overflowY={'scroll'}
        display={'flex'}
        flexDirection={'column-reverse'}
      >
        <Stack>
          {chatMessages.data?.map((message) => (
            <Box key={message.msgId}>
              <Box
                mx={2}
                my={1}
                p={3}
                float={
                  message.userId === sessionData?.user?.id ? 'right' : 'left'
                }
                bgColor={
                  message.userId === sessionData?.user?.id
                    ? 'yellow.100'
                    : 'gray.300'
                }
                rounded={'xl'}
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
