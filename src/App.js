import { useState } from "react";
import { Navbar, NavbarBrand, Collapse, Nav, NavItem, NavLink, NavbarToggler } from "reactstrap";
function App() {

  const [open, setOpen] = useState(false);
  const toggle = () => { setOpen(!open) };
  return (
    <div>
      <Navbar color='dark' dark expand='md'>
        <NavbarBrand href='#'>Minhas séries</NavbarBrand>
        <NavbarToggler onClick={toggle}></NavbarToggler>
        <Collapse isOpen={open} navbar>
          <Nav className='ml-auto'>
            <NavItem>
              <NavLink href='/'>Gêneros</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>

    </div>
  );
}

export default App;
