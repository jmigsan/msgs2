import { Button, HStack, Input, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { trpc } from '../../utils/trpc';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const UsernameChange = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [initialising, setInitialising] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { data: sessionData } = useSession();
  const router = useRouter();

  const setUsernameMutation = trpc.user.setUsername.useMutation({
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
    setErrorMessage(setUsernameMutation.error?.message as string);
  }, [setUsernameMutation.error]);

  useEffect(() => {
    if (sessionData?.user?.username) {
      setUsernameInput(sessionData?.user?.username);
    }
  }, [sessionData?.user?.username]);

  const setUsername = () => {
    setUsernameMutation.mutate({ username: usernameInput });
  };

  return (
    <>
      <Text>Choose a new username.</Text>
      <HStack>
        <Input
          placeholder='Choose a new username...'
          onChange={(e) => setUsernameInput(e.target.value)}
          value={usernameInput}
          disabled={initialising}
        />
        <Button w={'72'} onClick={() => setUsername()}>
          Change Username
        </Button>
      </HStack>
      <Text color={'red'}>{errorMessage}</Text>
    </>
  );
};
export default UsernameChange;
