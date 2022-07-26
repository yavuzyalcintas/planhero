import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <NavbarBs className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            <h4 className="text-secondary">Plan Hero</h4>
          </Nav.Link>
        </Nav>
        Hi,&nbsp;<b className="text-secondary">Yavuz</b>
      </Container>
    </NavbarBs>
  );
}
