import React from 'react';
import './styles/BaseStyles.css'
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../user/helper/userAPICalls';
import meadow from './images/meadow-short-75px.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart, faUser} from "@fortawesome/free-solid-svg-icons"
import 'bootstrap/dist/css/bootstrap.css'
import {Navbar, Nav, Container} from 'react-bootstrap'

const MyNavbar = () => {
  const navigate = useNavigate();

  return (<>
  <Navbar collapseOnSelect expand="xl" variant="light" bg="light">
    <Container>
      <Navbar.Brand>
        <img onClick={() => navigate('/')} className="custom-nav-image" src={meadow} alt="Meadow" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">

        <Nav.Link className='custom-nav-item' onClick={() => navigate('/produkty')}
          style={{color:'black'}}>
          Produkty Marki Meadow
        </Nav.Link>
        <Nav.Link className='custom-nav-item' onClick={() => navigate('/oferty-na-zamowienie')}
          style={{color:'black'}}>
          Oferty Na Zamówienie
        </Nav.Link>
        <Nav.Link className='custom-nav-item' onClick={() => navigate('/o-nas')}
          style={{color:'black'}}>
          O Nas
        </Nav.Link>
        <Nav.Link className='custom-nav-item' onClick={() => navigate('/faq')}
          style={{color:'black'}}>
          FAQ
        </Nav.Link>
        {!isAuthenticated() && <Nav.Link className='custom-nav-item' onClick={() => navigate('/membership')}
          style={{color:'black'}}>
          Meadow Membership
        </Nav.Link>}
        <Nav.Link className='custom-nav-item' onClick={() => navigate('/kontakt')}
          style={{color:'black'}}>
          Kontakt
        </Nav.Link>


      </Nav>
      <Nav className="ml-auto">
        {isAuthenticated() ? <>

          <Nav.Link className='custom-nav-item' onClick={() => navigate('/panel-uzytkownika')}
            style={{color:'black'}}>
            <FontAwesomeIcon icon={faUser}/> {isAuthenticated().user.email}
          </Nav.Link>


        </> : <>

          <Nav.Link className='custom-nav-item' onClick={() => navigate('/login')}
            style={{color:'black'}}>
            Zaloguj Się
          </Nav.Link>

        </>}

        <Nav.Link className='custom-nav-item' onClick={() => navigate('/koszyk')}
          style={{color:'black'}}>
            <FontAwesomeIcon icon={faShoppingCart}/> Koszyk
          </Nav.Link>

      </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>

    </>)}

export default MyNavbar;