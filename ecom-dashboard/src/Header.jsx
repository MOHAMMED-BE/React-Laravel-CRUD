import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const Header = () => {
    const data = JSON.parse(localStorage.getItem('user-info'));
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <Link to="/" className="btn btn-outline-light rounded-5">
                            Home
                        </Link>
                        {data ? (
                            <>
                                <Link to="/add" className="nav-link">
                                    Add Product
                                </Link>
                                <Link to="/search" className="nav-link">
                                    Search
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="nav-link">
                                    Login
                                </Link>
                                <Link to="/register" className="nav-link">
                                    Register
                                </Link>
                            </>
                        )}
                    </Nav>

                    {data ? (
                        <Nav>
                            <Nav.Item>
                                <NavDropdown title={`${data.user.name}`}>
                                    <NavDropdown.Item onClick={logOut}>LogOut</NavDropdown.Item>
                                </NavDropdown>
                            </Nav.Item>
                        </Nav>
                    ) : (
                        <></>
                    )}
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
