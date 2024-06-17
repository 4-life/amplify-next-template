import CommentsList from '@/components/admin-comments/CommentsList';
import NotFound from './not-found';
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default async function Comments(): Promise<JSX.Element> {
  const { data } = await client.models.Comment.list();

  if (!data) {
    return <NotFound />;
  }

  return <CommentsList preloadedList={data || []} />;
}
