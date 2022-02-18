import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../../actions/actions";

function HeaderScreen({ history }) {

    const  userLogin  = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch  = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>SalesBlink</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav className="me-auto">
                    </Nav>

                    <Nav>

                        <LinkContainer to='/'>
                            <Nav.Link>Posts</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to='/'>
                            <Nav.Link> Resources</Nav.Link>
                        </LinkContainer>



                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Manage Posts' id='adminmenu'>
                                <LinkContainer to='/admin/posts/'>
                                    <NavDropdown.Item>
                                        Posts
                                    </NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}

                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>
                                        My Account
                                    </NavDropdown.Item>
                                </LinkContainer>

                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ): (

                            <di>
                                <LinkContainer to='/login'>
                                    <Nav.Link><i className="fas fa-user"></i> Login</Nav.Link>
                                </LinkContainer>

                                <LinkContainer to='/register'>
                                    <Nav.Link><i className="fas fa-user"></i> Sign Up</Nav.Link>
                                </LinkContainer>
                            </di>

                        )}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default HeaderScreen;
