'use client';

import { Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';

interface Props {
  name: string;
  imageUrl: string;
  description: string;
}

export default function PostContent({
  name,
  imageUrl,
  description,
}: Props): JSX.Element {
  return (
    <>
      <Heading as="h2" size="md">
        {name}
      </Heading>
      <Image alt={name} src={imageUrl} priority width={200} height={200} />
      <Text>{description}</Text>
    </>
  );
}
