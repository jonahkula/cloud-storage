import React from "react";
import { Container } from "react-bootstrap";
import NavbarComponent from "../drive/Navbar";

export default function CenteredContainer({ children }) {
  return (
    <>
      <NavbarComponent />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          {children}
        </div>
      </Container>
    </>
  );
}
