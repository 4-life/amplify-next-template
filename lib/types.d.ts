import { Comment, Post } from "@/database/dynamo";

export type PostResponse = {
  error?: string;
  data?: Post;
};

export type CommentResponse = {
  error?: string;
  data?: Comment;
};

export type AllPostResponse = {
  error?: string;
  data?: Post[];
};

export type AllCommentsResponse = {
  error?: string;
  data?: Comment[];
};

export interface ReactChildren {
  children: React.ReactNode
}
