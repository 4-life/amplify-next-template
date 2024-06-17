'use client';

import { ReactChildren } from '@/lib/types';
import { ChakraProvider } from '@chakra-ui/react';

export default function Providers({ children }: ReactChildren): JSX.Element {
  return <ChakraProvider>{children}</ChakraProvider>;
}
