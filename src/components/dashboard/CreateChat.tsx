import { Button, Divider, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { trpc } from '../../utils/trpc';

const CreateChat = () => {
  const [userToInvite, setUserToInvite] = useState('');
  const createChatMutation = trpc.chat.createChat.useMutation();

  const createChat = () => {
    createChatMutation.mutate({ userId: userToInvite });
    setUserToInvite('');
  };

  return (
    <>
      {/* change it to username later */}
      <Input
        placeholder='Invite someone by typing their user id.'
        onChange={(e) => setUserToInvite(e.target.value)}
      />
      <Button onClick={() => createChat()}>Create Chat</Button>
    </>
  );
};

export default CreateChat;
