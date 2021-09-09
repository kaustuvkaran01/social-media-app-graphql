import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
  query {
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

export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      username
      body
      createdAt
      likeCount
      likes {
        id
        username
        createdAt
      }
      commentCount
      comments {
        id
        username
        createdAt
      }
    }
  }
`;
