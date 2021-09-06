import React, { useContext } from "react";

import { useQuery } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

import { Grid, Transition } from "semantic-ui-react";

import { AuthContext } from "../context/auth";

import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

export default function Home() {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);
  const token = localStorage.getItem("jwtToken");
  console.log(`Token : ${token}`);
  console.log(data);
  console.log(`Error : ${error}`);
  return (
    <div>
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1>Recent posts</h1>
        </Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        <Grid.Row>
          {loading ? (
            <h1>Loading posts..</h1>
          ) : (
            <Transition.Group>
              {data.getPosts &&
                data.getPosts.map((post) => {
                  return (
                    <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                      <PostCard post={post} />
                    </Grid.Column>
                  );
                })}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
}
