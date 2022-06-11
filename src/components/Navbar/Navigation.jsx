import React from 'react';
import { Navbar , Container  , Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <>
        <Navbar fixed="top" expand="md" className='navbar-section shadow bg-light'>
        <Container >
          <Navbar.Brand className={" fw-bolder fs-2"}>
            LOGO
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="text-dark"
          />
          <Navbar.Collapse id="basic-navbar-nav" className="text-dark justify-content-end">
            <Nav className="">
              <Link to={"/"} className={"nav-link text-dark fs-5 links"}>
              <i className="fa-solid fa-user-plus mx-2"></i>
                Register
              </Link>
              <Link to={"/getusers"} className={"nav-link text-dark fs-5 links"}>
              <i className="fa-solid fa-users mx-2"></i>
                Users
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation