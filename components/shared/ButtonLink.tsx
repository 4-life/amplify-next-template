'use client';

import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  path: string;
  name: string;
}

export default function ButtonLink({ path, name }: Props): JSX.Element {
  const pathname = usePathname();

  return (
    <Link href={{ pathname: path }} prefetch={false} passHref legacyBehavior>
      <Button colorScheme="teal" size="md" isDisabled={path === pathname}>
        {name}
      </Button>
    </Link>
  );
}
