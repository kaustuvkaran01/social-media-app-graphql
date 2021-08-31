import React from "react";
import moment from "moment";
import { Card, Image, Button, Label, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
export default function PostCard({
  post: { body, username, id, createdAt, likeCount, commentCount, likes },
}) {

  function likePost(){
    console.log("Like post!!");
  }
  function commentOnPost(){
    console.log("Comment on post");
  }
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
          <Button as="div" labelPosition="right" onClick={likePost}>
            <Button basic color="teal">
              <Icon name="heart" />
            </Button>
            <Label basic color="teal" pointing="left">
              {likeCount}
            </Label>
          </Button>
          <Button as="div" labelPosition="right" onClick={commentOnPost}>
            <Button basic color="blue">
              <Icon name="comments" />
            </Button>
            <Label basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
      </Card.Content>
    </Card>
  );
}
