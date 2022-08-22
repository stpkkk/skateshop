import React, { useRef } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useUserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";

const SignUp = ({ toggleIndex, authIndex }) => {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const { registerUser } = useUserContext();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = passwordRef.current.value;
    if (email && password && name) await registerUser(email, password, name);
     navigate("/"); //При signup , возвращаемся на главную //?
  }; 
  
  return (
    //onSubmit={onSubmit} вешаем на Form, долго не мог понять почему не работает firebase ( был на кнопке )
    <Card.Body>
      <h2 className="text-center mb-4">Sign Up</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" id="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" placeholder="Name" ref={nameRef} required />
        </Form.Group>

        <Form.Group className="mb-3" id="email">
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailRef}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" id="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
            required
          />
        </Form.Group>

        <div
          className="text-center"
          style={{ cursor: "pointer" }}
          onClick={toggleIndex}
        >
          {!authIndex ? "New user? Click here " : "Already have an account?"}
        </div>
        <Button
          className="w-50 m-3 mx-auto d-block"
          variant="primary"
          type="submit"
        >
          {!authIndex ? "Sign In" : "Sign Up"}
        </Button>
      </Form>
    </Card.Body>
  );
};

export default SignUp;
