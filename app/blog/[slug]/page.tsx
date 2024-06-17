import CommentForm from '@/components/blog/CommentForm';
import { cookiesClient } from '@/utils/amplify-utils';
import { Box, Heading, Text } from '@chakra-ui/react';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

/**
 * Generate the metadata for each static route at build time.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | null> {
  const { data } = await cookiesClient.models.Post.get({ id: params.slug });
  // Get the blog post.

  // const { data, error } = await post.get(params.slug);
  // No post? Bail...
  if (!data) {
    return {};
  }

  return {
    title: data.name,
    description: data.description,
  };
}

interface Props {
  params: { slug: string };
}

/**
 * The blog post page.
 */
export default async function Page({ params }: Props): Promise<JSX.Element> {
  // cached data returns after generateMetadata
  const { data } = await cookiesClient.models.Post.get({ id: params.slug });

  // No post? Bail...
  if (!data) {
    notFound();
  }

  return (
    <article>
      <Heading as="h2" fontSize="lg">
        {data.name}
      </Heading>

      <Box mb={4}>
        <Image
          alt={data.name || ''}
          src={data.imageUrl || ''}
          priority
          width={250}
          height={250}
        />
        <Text>{data.description}</Text>
      </Box>

      <CommentForm />
    </article>
  );
}
