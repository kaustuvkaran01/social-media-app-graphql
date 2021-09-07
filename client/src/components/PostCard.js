import React, { useContext } from "react";
import moment from "moment";
import { Card, Image, Button, Label, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";

export default function PostCard({
  post: { body, username, id, createdAt, likeCount, commentCount, likes },
}) {
  function deletePost(id) {
    console.log(`delete post of id : ${id}`);
  }

  const { user } = useContext(AuthContext);
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} id={id} likes={likes} likeCount={likeCount} />
        <Button labelPosition="right" as={Link} to={`/post/${id}`}>
          <Button basic color="blue">
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && (
          <Button
            as="div"
            color="red"
            onClick={() => deletePost(id)}
            floated="right"
          >
            <Icon name="trash" style={{ marginRight: 0 }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}
