'use client';

import { useState } from 'react';
import { comment, comments } from '@/lib/api-fetch';
import { Comment } from '@/database/dynamo';
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

interface Props {
  preloadedList: Comment[];
}

export default function CommentsList({ preloadedList }: Props): JSX.Element {
  const toast = useToast();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [commentsList, setComments] = useState<Comment[]>(preloadedList);

  const onDelete = async (id?: string): Promise<void> => {
    if (!id) {
      return;
    }

    setLoading(true);
    const result = await comment.delete(id);

    if (!result.error) {
      const updatedPosts = await comments.get();

      setComments(updatedPosts.data || []);

      toast({
        title: 'Comment deleted',
        description: 'Comment has been deleted successfully',
        status: 'success',
        duration: 5000,
      });
    } else {
      toast({
        title: 'Failed',
        description: `There was an error deletting comment: ${result.error}`,
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
          ({ commentId, name, email, comment: commentText }) => (
            <Box key={commentId} w="fit-content">
              <Heading as="h2" size="md">
                {name}
              </Heading>
              <Text>{email}</Text>
              <Text>{commentText}</Text>
              <Button
                leftIcon={<DeleteIcon />}
                colorScheme="pink"
                variant="solid"
                onClick={() => onDelete(commentId)}
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
