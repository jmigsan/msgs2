import { Button, Divider, HStack, Input, Stack } from '@chakra-ui/react';
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
    <Stack>
      <Input
        placeholder='Type a username start a conversation...'
        onChange={(e) => setUserToInvite(e.target.value)}
        value={userToInvite}
        w={'xs'}
      />
      <Button onClick={() => createChat()}>Create Chat</Button>
    </Stack>
  );
};

export default CreateChat;
