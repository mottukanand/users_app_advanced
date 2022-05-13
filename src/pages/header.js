import * as React from "react";
import { Navbar, Container } from "react-bootstrap";

export default function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Users List</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}
