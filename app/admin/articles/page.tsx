import PostsList from '@/components/admin-posts/PostsList';
import { cookiesClient } from '@/utils/amplify-utils';

export default async function Articles(): Promise<JSX.Element> {
  const { data } = await cookiesClient.models.Post.list();

  return <PostsList preloadedList={data || []} />;
}
