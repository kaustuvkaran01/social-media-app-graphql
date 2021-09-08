import { gql, useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { Button, Card, Grid, Image, Label, Icon } from "semantic-ui-react";
import moment from "moment";
import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

export default function SinglePost(props) {
  const { user } = useContext(AuthContext);
  const postId = props.match.params.postId;
  console.log(postId);
  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: { postId: postId },
  });

  console.log(data);
  let postMarkup;

  if (!data) {
    postMarkup = <p>Loading post...</p>;
  } else {
    const {
      id,
      body,
      username,
      createdAt,
      comments,
      likes,
      likeCount,
      commentCount,
    } = data.getPost;
    console.log(data);
    postMarkup = (
      <Grid style={{ marginTop: "5px" }}>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton
                  user={user}
                  id={id}
                  likeCount={likeCount}
                  likes={likes}
                />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log("Comment on post")}
                >
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return <div>{postMarkup}</div>;
}

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
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
