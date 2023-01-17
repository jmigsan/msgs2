import { Button, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { trpc } from '../../../utils/trpc';

const SendMessage = ({ currentChatId }: any) => {
  const sendMessageMutation = trpc.chat.sendMessage.useMutation();

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
