import React, { useRef } from "react";
import { useUserContext } from "../../contexts/userContext";
import { Form, Card, Button } from "react-bootstrap";
import { GoogleButton } from "react-google-button";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const SignIn = ({ toggleIndex, authIndex }) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { error, signInUser, forgotPassword, googleSignIn } = useUserContext();

  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      if (email && password) {
        await signInUser(email, password);
      }
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  }; // ? переход на главную когда ошибка

  const forgotPasswordHandler = () => {
    const email = emailRef.current.value;
    if (email)
	forgotPassword(email).then(() => {
		emailRef.current.value = "";
	});
  };

  return (
    <Card.Body>
      <h2 className="text-center mb-4">Sign In</h2>
      <>{error && <div className="error">{error}</div>}</>
      <Form onSubmit={onSubmit}>
        <Form.Group className="m-3" id="email">
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailRef}
            required
          />
        </Form.Group>

        <Form.Group className="m-3" id="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
            required
          />
        </Form.Group>

        <div
          className="text-center mb-2"
          style={{ cursor: "pointer" }}
          onClick={forgotPasswordHandler}
        >
          Forgot password?
        </div>

        <div
          className="text-center mb-4"
          style={{ cursor: "pointer" }}
          onClick={toggleIndex}
        >
          {!authIndex ? "New user? Click here " : "Already have an account?"}
        </div>

        <Button
          className="m-3 mx-auto d-block"
          variant="primary"
          type="submit"
          style={{ width: 240 }}
        >
          {!authIndex ? "Sign In" : "Sign Up"}
        </Button>
        <GoogleButton className="mx-auto" onClick={handleGoogleSignIn} />
      </Form>
    </Card.Body>
  );
};

export default SignIn;
