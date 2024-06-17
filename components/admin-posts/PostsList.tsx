'use client';

import Link from 'next/link';
import { useState } from 'react';
import { post, posts } from '@/lib/api-fetch';
import { Post } from '@/database/dynamo';
import { Box, Button, Progress, Stack, useToast } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import CreatePostForm from './CreatePostForm';
import PostContent from '../blog/PostContent';

interface Props {
  preloadedList: Post[];
}

export default function PostsList({ preloadedList }: Props): JSX.Element {
  const toast = useToast();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [postsList, setPosts] = useState<Post[]>(preloadedList);

  const onDelete = async (id?: string): Promise<void> => {
    if (!id) {
      return;
    }

    setLoading(true);
    const result = await post.delete(id);

    if (!result.error) {
      const updatedPosts = await posts.get();

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
        description: `There was an error deletting post: ${result.error}`,
        status: 'error',
        duration: 5000,
      });
    }

    setLoading(false);
  };

  const onUpdate = async (): Promise<void> => {
    const updatedPosts = await posts.get();

    setPosts(updatedPosts.data || []);
  };

  return (
    <>
      {isLoading && <Progress size="xs" isIndeterminate />}
      <Stack direction={['column', 'row']} spacing={10} mb={4} flexWrap="wrap">
        {postsList.map(({ postId, name, imageUrl, description }) => (
          <Box key={postId} w="fit-content">
            <Link href={`/blog/${postId}`}>
              <PostContent
                name={name}
                imageUrl={imageUrl}
                description={description}
              />
            </Link>
            <Button
              leftIcon={<DeleteIcon />}
              colorScheme="pink"
              variant="solid"
              onClick={() => onDelete(postId)}
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
