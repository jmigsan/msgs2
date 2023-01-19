import { Button, Divider, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { trpc } from '../../utils/trpc';

const CreateChat = () => {
  const [userToInvite, setUserToInvite] = useState('');
  const createChatMutation = trpc.chat.createChat.useMutation();

  const createChat = () => {
    createChatMutation.mutate({ username: userToInvite });
    setUserToInvite('');
  };

  // change input onchange to username later
  return (
    <>
      <Input
        placeholder='Invite someone by typing their username'
        onChange={(e) => setUserToInvite(e.target.value)}
        value={userToInvite}
      />
      <div>{userToInvite}</div>
      <Button onClick={() => createChat()}>Create Chat</Button>
    </>
  );
};

export default CreateChat;
