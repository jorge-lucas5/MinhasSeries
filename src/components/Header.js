import { Navbar, NavbarBrand, Collapse, Nav, NavItem, NavLink, NavbarToggler } from "reactstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={Link} to='/'>Minhas Séries</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/generos">Gêneros</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}
