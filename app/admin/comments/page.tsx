import CommentsList from '@/components/admin-comments/CommentsList';
import NotFound from './not-found';
import { cookiesClient } from '@/utils/amplify-utils';

export default async function Comments(): Promise<JSX.Element> {
  const { data } = await cookiesClient.models.Comment.list();

  if (!data) {
    return <NotFound />;
  }

  return <CommentsList preloadedList={data || []} />;
}
