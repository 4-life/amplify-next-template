'use client';

import { FormEvent, useState } from 'react';
import { posts } from '@/lib/api-fetch';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';

interface Props {
  onUpdate: () => Promise<void>;
}

export default function CreatePostForm({ onUpdate }: Props): JSX.Element {
  const toast = useToast();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    setLoading(true);
    const result = await posts.create({
      name,
      description,
      imageUrl: image,
      price: 0,
    });
    setLoading(false);

    if (result && !result.error) {
      setName('');
      setDescription('');
      setImage('');

      toast({
        title: 'Post created',
        description: 'Your post has been submitted',
        status: 'success',
        duration: 5000,
      });

      onUpdate();
    }

    // If there was an error...
    if (result && result.error) {
      toast({
        title: 'Failed',
        description: `There was an error submitting your post: ${result.error}`,
        status: 'error',
        duration: 5000,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card variant="outline">
        <CardHeader pb={0}>
          <Text as="h3" fontSize="xl">
            New post
          </Text>
        </CardHeader>
        <CardBody gap={2} display="flex" flexDirection="column">
          <Box>
            <Input
              placeholder="Name"
              isRequired
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Box>
          <Box>
            <Textarea
              placeholder="Description"
              isRequired
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </Box>
          <Box>
            <Input
              placeholder="Link to image"
              isRequired
              onChange={(e) => setImage(e.target.value)}
              value={image}
            />
          </Box>
        </CardBody>

        <CardFooter justifyContent="flex-end">
          <Button
            colorScheme="teal"
            size="md"
            type="submit"
            isLoading={isLoading}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
