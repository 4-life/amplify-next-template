'use client';

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
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { FormEvent, useState } from 'react';

const client = generateClient<Schema>();

/**
 * The comment form component.
 */
export default function CommentForm(): JSX.Element {
  const toast = useToast();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);

  /**
   * Handle the comment form submission.
   */
  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    setLoading(true);

    const result = await client.models.Comment.create({
      name,
      email,
      comment,
    });

    setLoading(false);

    // If the comment was created successfully...
    if (result && !result.errors) {
      // Clear the form.
      setName('');
      setEmail('');
      setComment('');

      // Set the status message.
      toast({
        title: 'Comment submitted',
        description: `Thank you ${name}! Your comment has been submitted and is awaiting moderation`,
        status: 'success',
        duration: 9000,
      });
    }

    // If there was an error...
    if (result.errors) {
      toast({
        title: 'Failed',
        description: `There was an error submitting your comment: ${result.errors}`,
        status: 'error',
        duration: 9000,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card maxW={300} variant="outline">
        <CardHeader>
          <Text as="h3" fontSize="md">
            Leave a Comment
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
            <Input
              placeholder="Email"
              isRequired
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            />
          </Box>
          <Box>
            <Textarea
              placeholder="Comment"
              isRequired
              onChange={(e) => setComment(e.target.value)}
              value={comment}
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
