import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap'

export default function Navibar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <Navbar expand style={{background: '#757bc8'}}>
      <Link to="/" className="ml-1">
        <NavbarBrand style={{color: '#FFF', textDecoration: 'none', fontWeight: 'bold'}}>
          Anonymail
        </NavbarBrand>
      </Link>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <Link to="/about" style={{color: '#FFF', textDecoration: 'none'}}>About</Link>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  )
}
