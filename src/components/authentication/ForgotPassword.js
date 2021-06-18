import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for password reset instructions");
    } catch {
      setError("Password reset failed");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-3">Password Reset</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}

          <Form className="mb-3" onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-4">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Button disabled={loading} type="submit" className="w-100">
              Reset Password
            </Button>
          </Form>

          <div className="w-100 text-center mb-1">
            <Link to="/login">Log In</Link>
          </div>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-3">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
