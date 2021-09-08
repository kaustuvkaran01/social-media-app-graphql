import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Confirm, Icon } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
export default function DeleteButton({ postId }) {
  //   console.log("Post iD: ", postId);
  const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
      deletePost(postId: $postId) {
        id
      }
    }
  `;
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost, { data, loading, error }] = useMutation(
    DELETE_POST_MUTATION,
    {
      update(proxy) {
        setConfirmOpen(false);
        const data = proxy.readQuery(FETCH_POSTS_QUERY);
        let newData = data;
        newData = newData.filter((p) => p.id !== postId);
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, newData });
      },
      variables: { postId: postId },
    }
  );

  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => deletePost(postId)}
      />
    </>
  );
}
