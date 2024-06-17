// import { useState, useEffect } from "react";
// import { generateClient } from "aws-amplify/data";
// import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import config from '@/config';
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Box, Stack } from "@chakra-ui/react";
import { cookiesClient } from "@/utils/amplify-utils";
import { Metadata } from "next";
import Link from "next/link";
import PostContent from "@/components/blog/PostContent";
import CommentForm from "@/components/blog/CommentForm";

Amplify.configure(outputs);

// const client = generateClient<Schema>();

export const metadata: Metadata = {
  title: `${config.siteName} - Blog`,
  description: config.siteDescription,
};

export default async function App() {
  const { data } = await cookiesClient.models.Post.list();
  // const [todos, setTodos] = useState<Array<Schema["Post"]["type"]>>([]);

  // function listTodos() {
  //   client.models.Post.observeQuery().subscribe({
  //     next: (data) => setTodos([...data.items]),
  //   });
  // }

  // useEffect(() => {
  //   listTodos();
  // }, []);

  // function createTodo() {
  //   client.models.Post.create({
  //     content: window.prompt("Todo content"),
  //   });
  // }

  return (
    <>
      <Stack direction={['column', 'row']} spacing={10} flexWrap="wrap">
        {data.map(({ id, name, imageUrl, description }) => (
          <Box key={id} w="fit-content">
            <Link href={`/blog/${id}`}>
              <PostContent
                name={name || ''}
                imageUrl={imageUrl || ''}
                description={description || ''}
              />
            </Link>
          </Box>
        ))}
      </Stack>
      <CommentForm />
    </>
  );

  // return (
  //   <main>
  //     <h1>My todos</h1>
  //     <button onClick={createTodo}>+ new</button>
  //     <ul>
  //       {todos.map((todo) => (
  //         <li key={todo.id}>{todo.content}</li>
  //       ))}
  //     </ul>
  //     <div>
  //       🥳 App successfully hosted. Try creating a new todo.
  //       <br />
  //       <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
  //         Review next steps of this tutorial.
  //       </a>
  //     </div>
  //   </main>
  // );
}
