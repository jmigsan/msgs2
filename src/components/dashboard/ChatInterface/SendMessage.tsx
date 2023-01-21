import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import { trpc } from '../../../utils/trpc';

const SendMessage = ({ currentChatId }: any) => {
  const utils = trpc.useContext();

  const [sending, setSending] = useState(false);

  const sendMessageMutation = trpc.chat.sendMessage.useMutation({
    onMutate: () => {
      setSending(true);
    },
    onSettled: () => {
      setSending(false);
      utils.chat.getMessages.invalidate();
      setMessage('');
    },
  });

  const [message, setMessage] = useState('');

  const sendMessage = () => {
    sendMessageMutation.mutate({
      message: message,
      chatId: currentChatId,
    });
  };

  return (
    <>
      <HStack py={2}>
        <InputGroup>
          <Input
            placeholder='Send a message...'
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            disabled={sending}
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
          />
          {/* <InputRightElement children={sending ? <Spinner /> : <></>} /> */}
        </InputGroup>
        <Button
          onClick={() => sendMessage()}
          bg={'yellow.100'}
          colorScheme={'yellow'}
          px={6}
        >
          Send
        </Button>
      </HStack>
    </>
  );
};
export default SendMessage;
