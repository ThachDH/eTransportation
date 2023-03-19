import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Alert, Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import { Box } from '@mui/system';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
function Navigation() {
    const email = localStorage.getItem('email');
    const user_name = localStorage.getItem('user_name')
    const handleLogout = () => {
        localStorage.clear();
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Navbar collapseOnSelect expand="lg" variant="white">
                <Container>
                    <Navbar.Brand href="home">eTransportaion</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {/* <Nav.Link href="#features">Giới thiệu</Nav.Link> */}
                            <Nav.Link href="ticketpage">Mua vé</Nav.Link>
                            {/* <Nav.Link href="#pricing">Bảng giá</Nav.Link>
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
                            </NavDropdown> */}
                        </Nav>
                        <Nav>
                            {email == null ?
                                <Nav.Link eventKey={2} href="login"> Đăng nhập </Nav.Link> :
                                <>
                                    <Nav.Link>Xin chào {user_name}</Nav.Link>
                                    <Tooltip title="Thông tin tài khoản">
                                        <IconButton
                                            onClick={handleClick}
                                            size="small"
                                            sx={{ ml: 2 }}
                                            aria-controls={open ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                        >
                                            <AccountCircleIcon sx={{ width: 32, height: 32 }}></AccountCircleIcon>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={open}
                                        onClose={handleClose}
                                        onClick={handleClose}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <Nav.Link href='/user-account-page'>
                                                <ManageAccountsIcon fontSize='medium' color='action' />&ensp;Quản lý tài khoản
                                            </Nav.Link>
                                        </MenuItem>

                                        <Divider />

                                        <MenuItem>
                                            <Nav.Link href="/home" onClick={handleLogout}>
                                                <Logout fontSize="medium" color='action' />&ensp;Đăng xuất
                                            </Nav.Link>
                                        </MenuItem>

                                    </Menu>

                                </>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>

    );
}

export default Navigation;