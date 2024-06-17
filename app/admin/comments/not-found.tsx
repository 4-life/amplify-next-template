import { Center } from '@chakra-ui/react';

/**
 * Not Found component.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/not-found
 */
export default function NotFound(): JSX.Element {
  return (
    <Center w="180px" h="40px" bg="red.200">
      Comments not found!
    </Center>
  );
}
