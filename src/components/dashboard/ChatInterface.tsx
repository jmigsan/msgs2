import { Box, Text } from '@chakra-ui/react';

const ChatInterface = (currentChatId: any) => {
  return (
    <Box>
      <Text>{currentChatId}</Text>
    </Box>
  );
};
export default ChatInterface;
