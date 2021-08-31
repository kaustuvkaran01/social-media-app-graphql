import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

import { gql } from "@apollo/client";

export default function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //fire a mutation to register the user.
  };

  //   const [addUser, {}]
  return (
    <Form onSubmit={onSubmit}>
      <Form.Input
        label="Username"
        placeholder="Username.."
        name="username"
        value={values.username}
        onChange={onChange}
      />
      <Form.Input
        label="Email"
        placeholder="Email.."
        name="email"
        value={values.email}
        onChange={onChange}
      />
      <Form.Input
        label="Password.."
        placeholder="Password.."
        name="password"
        value={values.password}
        onChange={onChange}
      />
      <Form.Input
        label="Confirm Password.."
        placeholder="Confirm Password.."
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={onChange}
      />
      <Button type="submit" primary>
        Register
      </Button>
    </Form>
  );
}

const REGISTER_USER = gql`
  # Register a user
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
