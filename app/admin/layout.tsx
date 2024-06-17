import ButtonLink from '@/components/shared/ButtonLink';
import config from '@/config';
import { ReactChildren } from '@/lib/types';
import { Heading, Stack } from '@chakra-ui/react';
import type { Metadata } from 'next';

/**
 * Default metadata.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata
 */
export const metadata: Metadata = {
  title: `${config.siteName} - Admin panel`,
  description: config.siteDescription,
};

/**
 * The weather (client) root layout.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/layout
 */
export default function AdminLayout({ children }: ReactChildren): JSX.Element {
  return (
    <>
      <Heading fontSize="xl">Admin panel</Heading>

      <Stack spacing={4} direction="row" align="center" mb={4}>
        {config.navAdmin.map((item, index) => (
          <ButtonLink key={`${index + 1}`} path={item.path} name={item.name} />
        ))}
      </Stack>

      {children}
    </>
  );
}
