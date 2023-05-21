import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FaBeer, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/usersApiSlice';

const Header = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { userInfo } = useSelector((state) => state.auth)

   const [logoutApiCall] = useLogoutMutation();

   const logoutHandler = async () => {
    try {
        await logoutApiCall().unwrap()
        dispatch(logout())
        navigate('/login')
    } catch (error) {
      console.log(error)
    }
   }

  return (
        <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Social Learn</Navbar.Brand>
          </LinkContainer>
            
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              { userInfo ? (
                 <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/users'>
                    <NavDropdown.Item>
                      <FaBeer />All Users
                    </NavDropdown.Item>
                  </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                 <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/users'>
                  <Nav.Link>
                      <FaBeer />All Users
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
