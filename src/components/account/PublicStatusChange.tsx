import { Box, Button, HStack, Text } from '@chakra-ui/react';
import { trpc } from '../../utils/trpc';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

const PublicStatusChange = () => {
  const [initialising, setInitialising] = useState(false);
  const router = useRouter();

  const publicStatusMutation = trpc.user.setPublicStatus.useMutation({
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
  const { data: sessionData } = useSession();

  const togglePublicStatus = () => {
    publicStatusMutation.mutate();
  };

  return (
    <>
      <HStack>
        <Text>
          Current Public Status: {sessionData?.user?.public ? 'True' : 'False'}
        </Text>
        <Button
          onClick={() => togglePublicStatus()}
          disabled={initialising}
          bg={'yellow.100'}
          colorScheme={'yellow'}
        >
          Toggle Public Status
        </Button>
      </HStack>
    </>
  );
};
export default PublicStatusChange;
