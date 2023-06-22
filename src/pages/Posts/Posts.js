import React from "react";
import Post from "../../components/Post/Post";
import { gql, useQuery } from "@apollo/client";

const GET_POSTS = gql`
  query posts {
    posts {
      id
      title
      content
      published
      createdAt
      user {
        name
      }
    }
  }
`;

export default function Posts() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error Page</div>;

  const { posts } = data;
  return (
    <div>
      {posts.map(({ id, title, content, createdAt, published, user }) => {
        return (
          <Post
            key={id}
            title={title}
            content={content}
            date={createdAt}
            published={published}
            user={user.name}
            id={id}
          />
        );
      })}
    </div>
  );
}
