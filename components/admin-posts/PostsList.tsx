'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Box, Button, Progress, Stack, useToast } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import CreatePostForm from './CreatePostForm';
import PostContent from '../blog/PostContent';
import type { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);

const client = generateClient<Schema>();

interface Props {
  preloadedList: Schema["Post"]["type"][];
}

export default function PostsList({ preloadedList }: Props): JSX.Element {
  const toast = useToast();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [postsList, setPosts] = useState<Schema["Post"]["type"][]>(preloadedList);

  const onDelete = async (id?: string): Promise<void> => {
    if (!id) {
      return;
    }

    setLoading(true);
    const result = await client.models.Post.delete({ id });

    if (!result.errors?.length) {
      const updatedPosts = await client.models.Post.list();

      setPosts(updatedPosts.data || []);

      toast({
        title: 'Post deleted',
        description: 'Post has been deleted successfully',
        status: 'success',
        duration: 5000,
      });
    } else {
      toast({
        title: 'Failed',
        description: `There was an error deletting post: ${result.errors}`,
        status: 'error',
        duration: 5000,
      });
    }

    setLoading(false);
  };

  const onUpdate = async (): Promise<void> => {
    const updatedPosts = await client.models.Post.list();

    setPosts(updatedPosts.data || []);
  };

  return (
    <>
      {isLoading && <Progress size="xs" isIndeterminate />}
      <Stack direction={['column', 'row']} spacing={10} mb={4} flexWrap="wrap">
        {postsList.map(({ id, name, imageUrl, description }) => (
          <Box key={id} w="fit-content">
            <Link href={`/blog/${id}`}>
              <PostContent
                name={name || ''}
                imageUrl={imageUrl || ''}
                description={description || ''}
              />
            </Link>
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
        ))}
      </Stack>

      <CreatePostForm onUpdate={onUpdate} />
    </>
  );
}
