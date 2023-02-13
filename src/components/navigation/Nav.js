import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigation() {

    return (
        <>
            <Navbar collapseOnSelect expand="lg" variant="white">
                <Container>
                    <Navbar.Brand href="home">eTransportaion</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#features">Giới thiệu</Nav.Link>
                            <Nav.Link href="#pricing">Bảng giá</Nav.Link>
                            <NavDropdown title="Dịch Vụ" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Xe 16 Chỗ</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Xe 35 Chỗ
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Xe 45 Chỗ</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Xe giường nằm
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets">VN</Nav.Link>
                            <Nav.Link eventKey={2} href="login">
                                Đăng nhập                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>

    );
}

export default Navigation;