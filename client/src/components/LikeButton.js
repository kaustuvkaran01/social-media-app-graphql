import React, { useState, useEffect } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import PopupModal from "./PopupModal";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
export default function LikeButton({ id, likes, likeCount, user }) {
  const [liked, setLiked] = useState();

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  //   function likePost(id) {
  //     console.log(`Like post!! of id : ${id}`);
  //   }

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <PopupModal
      content={liked ? "Unlike post" : "Like post"}
      children={
        <Button as="div" labelPosition="right" onClick={likePost}>
          {/* {likeButton} */}
          {/* <Button color="teal">
        <Icon name="like" />
      </Button> */}

          {likeButton}

          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
      }
    />
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      body
      username
      createdAt
      likes {
        id
        username
        createdAt
      }
      likeCount
      commentCount
    }
  }
`;
