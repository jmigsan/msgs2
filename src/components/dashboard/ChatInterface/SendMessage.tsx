import { Button, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { trpc } from '../../../utils/trpc';

const SendMessage = ({ currentChatId }: any) => {
  const utils = trpc.useContext();

  const sendMessageMutation = trpc.chat.sendMessage.useMutation({
    onSuccess: () => {
      utils.chat.getMessages.invalidate();
    },
  });

  const [message, setMessage] = useState('');

  const sendMessage = () => {
    sendMessageMutation.mutate({
      message: message,
      chatId: currentChatId,
    });
    setMessage('');
  };

  return (
    <>
      <Input
        placeholder='Send a message...'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <Button onClick={() => sendMessage()}>Send</Button>
    </>
  );
};
export default SendMessage;
