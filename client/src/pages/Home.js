import React from "react";

import { gql, useQuery } from "@apollo/client";

import { Grid } from "semantic-ui-react";

import PostCard from "../components/PostCard";

export default function Home() {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);
  console.log(data);
  console.log(error);
  return (
    <div>
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1>Recent posts</h1>
        </Grid.Row>
        <Grid.Row>
          {loading ? (
            <h1>Loading posts..</h1>
          ) : (
            data.getPosts &&
            data.getPosts.map((post) => {
              return (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              );
            })
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
