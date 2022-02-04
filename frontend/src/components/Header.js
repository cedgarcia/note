import React from 'react';

import { Link } from 'react-router-dom';
// import { Navbar, Container, NavDropdown } from 'react-bootstrap';
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavbarBrand,
  NavDropdown,
} from 'react-bootstrap';
const Header = () => (
  <Navbar bg="primary" expand="lg" variant="dark">
    <Container>
      <Link to="/">
        <Navbar.Brand>Note Zipper</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="m-auto">
          <Form>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          </Form>
        </Nav>
        <Nav>
          <Link to="/mynotes">
            <p> My Notes</p>
          </Link>
          <NavDropdown title="Cedrickgarcia" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">My profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Header;