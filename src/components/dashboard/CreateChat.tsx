import { Button, Divider, HStack, Input, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { trpc } from '../../utils/trpc';
import { useRouter } from 'next/router';

const CreateChat = () => {
  const [initialising, setInitialising] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const [userToInvite, setUserToInvite] = useState('');
  const createChatMutation = trpc.chat.createChat.useMutation({
    onMutate: () => {
      setInitialising(true);
    },
    onSettled: () => {
      setInitialising(false);
    },
    onSuccess: () => {
      router.reload();
    },
  });

  //i'd do onError instead, but it doesn't work sometimes.
  useEffect(() => {
    setErrorMessage(createChatMutation.error?.message as string);
  }, [createChatMutation.error]);

  const createChat = () => {
    if (userToInvite === '') {
      setErrorMessage('Please enter a username.');
    } else {
      createChatMutation.mutate({ username: userToInvite });
      setUserToInvite('');
    }
  };

  return (
    <Stack>
      <Input
        placeholder='Type a username start a conversation...'
        onChange={(e) => setUserToInvite(e.target.value)}
        value={userToInvite}
        w={'xs'}
        onKeyDown={(e) => {
          if (e.key === 'Enter') createChat();
        }}
        disabled={initialising}
      />
      <Button onClick={() => createChat()} disabled={initialising}>
        Create Chat
      </Button>
      <Text color={'red'}>{errorMessage}</Text>
    </Stack>
  );
};

export default CreateChat;
