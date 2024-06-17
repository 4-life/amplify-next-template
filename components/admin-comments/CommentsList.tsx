'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Progress,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import type { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

interface Props {
  preloadedList: Schema['Comment']['type'][];
}

export default function CommentsList({ preloadedList }: Props): JSX.Element {
  const toast = useToast();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [commentsList, setComments] = useState<Schema['Comment']['type'][]>(preloadedList);

  function listTodos() {
    client.models.Comment.observeQuery().subscribe({
      next: (data) => setComments([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  const onDelete = async (id?: string): Promise<void> => {
    if (!id) {
      return;
    }

    setLoading(true);
    const result = await client.models.Comment.delete({ id });

    if (!result.errors?.length) {
      toast({
        title: 'Comment deleted',
        description: 'Comment has been deleted successfully',
        status: 'success',
        duration: 5000,
      });
    } else {
      toast({
        title: 'Failed',
        description: `There was an error deletting comment: ${result.errors}`,
        status: 'error',
        duration: 5000,
      });
    }

    setLoading(false);
  };

  return (
    <>
      {isLoading && <Progress size="xs" isIndeterminate />}
      <Stack direction={['column', 'row']} spacing={20} mb={4} flexWrap="wrap">
        {commentsList.map(
          ({ id, name, email, comment: commentText }) => (
            <Box key={id} w="fit-content">
              <Heading as="h2" size="md">
                {name}
              </Heading>
              <Text>{email}</Text>
              <Text>{commentText}</Text>
              <Button
                leftIcon={<DeleteIcon />}
                colorScheme="pink"
                variant="solid"
                onClick={() => onDelete(id)}
                isDisabled={isLoading}
              >
                Delete
              </Button>
            </Box>
          ),
        )}
      </Stack>
    </>
  );
}
