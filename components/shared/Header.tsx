import config from '@/config';
import { Box, Heading, Spacer, Stack } from '@chakra-ui/react';
import Link from 'next/link';

import ButtonLink from './ButtonLink';

/**
 * The shared header component.
 */
export default function Header(): JSX.Element {
  return (
    <Box as="header" mt={4}>
      <Heading>
        <Link href="/">{config.siteName}</Link>
      </Heading>
      <Spacer pb={2} />
      <Stack spacing={4} direction="row" align="center">
        {config.nav.map((item, index) => (
          <ButtonLink key={`${index + 1}`} path={item.path} name={item.name} />
        ))}
      </Stack>
    </Box>
  );
}
