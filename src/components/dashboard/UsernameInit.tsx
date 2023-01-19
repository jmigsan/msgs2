import { Button, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { trpc } from '../../utils/trpc';

const UsernameInit = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [initialising, setInitialising] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const setUsernameMutation = trpc.user.setUsername.useMutation({
    onMutate: () => {
      setInitialising(true);
    },
    onSettled: () => {
      setInitialising(false);
    },
  });

  const setUsername = () => {
    const errorMessage = setUsernameMutation.mutate({
      username: usernameInput,
    });
    setErrorMessage(errorMessage.data);
  };

  return (
    <>
      <Text>
        You haven't created a username yet. Create one now so people know how to
        find you.
      </Text>
      <Input
        placeholder='Choose a new username'
        onChange={(e) => setUsernameInput(e.target.value)}
        value={usernameInput}
        disabled={initialising}
      />
      <Text color={'red'}>{errorMessage}</Text>
      <Button onClick={() => setUsername()}></Button>
    </>
  );
};
export default UsernameInit;
