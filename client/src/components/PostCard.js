import React, { useContext } from "react";
import moment from "moment";
import { Card, Image, Button, Label, Icon } from "semantic-ui-react";
import PopupModal from "./PopupModal";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "./DeleteButton";

export default function PostCard({
  post: { id, body, username, createdAt, likeCount, commentCount, likes },
}) {
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
        <PopupModal
          content="Comment on post"
          children={
            <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
              <Button basic color="blue">
                <Icon name="comments" />
              </Button>
              <Label basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          }
        />
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}
