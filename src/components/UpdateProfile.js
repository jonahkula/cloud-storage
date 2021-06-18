import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import firebase from "firebase";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const originalPasswordRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function clearPasswords() {
    passwordRef.current.value = "";
    passwordConfirmRef.current.value = "";
    originalPasswordRef.current.value = "";
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      clearPasswords();
      return setError("Passwords do not match");
    }

    const promises = [];
    setError("");
    setLoading(true);

    const credential = firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      originalPasswordRef.current.value
    );

    try {
      await currentUser.reauthenticateWithCredential(credential);
    } catch {
      clearPasswords();
      setLoading(false);
      return setError("Incorrect password");
    }

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value !== "") {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        clearPasswords();
        setError("Failed to update profile");
        setLoading(false);
      });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-3">Update Profile</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form className="mb-3" onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-2">
              <Form.Label>New Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password" className="mb-2">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} />
            </Form.Group>
            <Form.Group id="password-confirm" className="mb-2">
              <Form.Label>New Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} />
            </Form.Group>
            <Form.Group id="original-password" className="mb-4">
              <Form.Label>Enter Original Password</Form.Label>
              <Form.Control
                type="password"
                ref={originalPasswordRef}
                required
              />
            </Form.Group>

            <Button disabled={loading} type="submit" className="w-100">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-3">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
}
