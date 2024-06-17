import config from '@/config';
import { Flex, Text } from '@chakra-ui/react';

/**
 * The shared footer component.
 */
export default function Footer(): JSX.Element {
  return (
    <footer>
      <hr />
      <Flex paddingBottom={4} paddingTop={4} justifyContent="space-between">
        <Text>Created by {config.author}</Text>
        <Text>2024</Text>
      </Flex>
    </footer>
  );
}
