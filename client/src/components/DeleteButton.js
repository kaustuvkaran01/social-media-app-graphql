import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Confirm, Icon } from "semantic-ui-react";
import PopupModal from "./PopupModal";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

export default function DeleteButton({ postId, callback, commentId }) {
  //   console.log("Post iD: ", postId);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrComment, { data, loading, error }] = useMutation(
    mutation,
    {
      update(proxy) {
        setConfirmOpen(false);
        console.log(commentId);
        if (!commentId) {
          const data = proxy.readQuery({
            query: FETCH_POSTS_QUERY,
          });
          console.log("Delete button data: ", data);
          let newData = data;
          console.log("Delete button newData :", newData);
          newData.getPosts = newData.getPosts.filter((p) => {
            return p.id !== postId;
          });
          proxy.writeQuery({ query: FETCH_POSTS_QUERY, newData });
        }
        if (callback) callback();
      },
      variables: { postId: postId, commentId: commentId },
    }
  );

  return (
    <>
      <PopupModal
        content={commentId ? "Delete comment" : "Delete post"}
        children={
          <Button
            as="div"
            color="red"
            floated="right"
            onClick={() => setConfirmOpen(true)}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        }
      />
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      id
      username
      body
    }
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;
