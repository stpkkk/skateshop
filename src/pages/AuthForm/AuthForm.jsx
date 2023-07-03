import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "./Auth.module.css";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

const AuthForm = () => {
  const [authIndex, setAuthIndex] = useState(false);
  const toggleAuthIndex = () => {
    setAuthIndex(prevState => !prevState);
  };

  return (
    <>
      <Card className="bg-dark mx-auto mt-50" style={{ maxWidth: "450px" }}>
        {!authIndex ? (
          <SignIn toggleIndex={toggleAuthIndex} authIndex={authIndex} />
        ) : (
          <SignUp toggleIndex={toggleAuthIndex} authIndex={authIndex} />
        )}
      </Card>
    </>
  );
};

export default AuthForm;
