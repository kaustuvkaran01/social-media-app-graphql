import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "../utils/hooks";
import { useMutation } from "@apollo/client";
import { FETCH_POSTS_QUERY, CREATE_POST_MUTATION } from "../utils/graphql";
export default function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      let newData = [...data.getPosts];
      newData = [result.data.createPost, ...newData];
      // console.log("ERRR : ", error);
      // console.log("RESULT : ", result.data.createPost);
      // console.log(data);
      // data.getPosts = [result.data.createPost, ...data.getPosts];
      // data.getPosts.push(result.data.createPost);

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: { newData },
        },
      });
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi World!"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && console.log("ERRR : ", error)}
    </>
  );
}
