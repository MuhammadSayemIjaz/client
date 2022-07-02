import React from 'react';
import { Navbar , Container  , Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
        <Navbar fixed="top" expand="md" className='shadow bg-light'>
        <Container >
          <Navbar.Brand className={" fw-bolder fs-2"} style={{letterSpacing : "10px"}}>
            MERN
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="text-dark"
          />
          <Navbar.Collapse id="basic-navbar-nav" className="text-dark justify-content-end">
            <Nav className="">
              <NavLink to={"/"} className={"nav-link text-dark fs-5 links"}>
              <i className="fa-solid fa-user-plus mx-2"></i>
                Register
              </NavLink>
              <NavLink to={"/getusers"} className={"nav-link text-dark fs-5 links"}>
              <i className="fa-solid fa-users mx-2"></i>
                Users
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default Navigation