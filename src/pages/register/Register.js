import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import background from "../../assets/background.jpg"
import Navigation from '../../components/navigation/Nav';
import { Nav } from 'react-bootstrap';
import '../login/index.scss'
import { IconButton } from '@mui/material';
import { Alarm, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import HomePage from '../homepage/HomePage';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


export default function Register() {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [kq, setState] = useState({
        alert: {
            isOpen: false,
            message: 'Lỗi không xác định!',
            duration: 10000,
            type: 'info'
        }
    });
    const theme = createTheme();
    const [showPassword, setShowPassword] = React.useState(false);
    const [getFullName, setFullName] = useState("");
    const [getEmail, setEmail] = useState("");
    const [getPass, setPass] = useState("")
    const [getNumber, setNumber] = useState("")


    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleRegister = (e) => {

        let dataSend = {
            email: getEmail,
            name: getFullName,
            password: getPass,
            phone_number: getNumber
        }

        fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(dataSend),
        })
            .then(async (res) => {
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text);
                }
                return res.json();
            })
            .then(data => {
                if (data.data) {
                    setState({
                        alert: {
                            isOpen: true,
                            message: "Đăng kí thành công!!!",
                            duration: 3000,
                            type: 'success',
                        }
                    });
                } else {
                    setState({
                        alert: {
                            isOpen: true,
                            message: "Đăng kí thất bại!!!",
                            duration: 3000,
                            type: 'error',
                        }
                    });
                }

            })
            .catch(err => {
                setState({
                    alert: {
                        isOpen: true,
                        message: "Email của bạn đã được sử dụng!!!",
                        duration: 3000,
                        type: 'error',
                    }
                });
                return err;
            })
    }

    return (
        <>
            <Navigation />

            <div className='backgound-login'>
                <img src={background} alt="background" height="100%" width="100%" ></img>
                <div className='chil-background-login'>
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Tạo tài khoản
                                </Typography>
                                <Box component="form" noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="email"
                                        label="Họ và Tên"
                                        autoComplete="ten"
                                        autoFocus
                                        onChange={(e) => {
                                            setFullName(e.target.value)
                                        }}
                                    />

                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                    />

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={8}>
                                            <TextField margin="normal"
                                                required
                                                fullWidth
                                                name="password"
                                                label="Mật khẩu"
                                                type={showPassword ? "password" : "text"}
                                                id="password"
                                                autoComplete="current-password"
                                                onChange={(e) => {
                                                    setPass(e.target.value)
                                                }}
                                            >
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={4} mt={2.8}>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </Grid>

                                    </Grid>


                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="phonenumber"
                                        label="Số điện thoại"
                                        name="email"
                                        type="number"
                                        autoComplete="email"
                                        autoFocus
                                        onChange={(e) => {
                                            setNumber(e.target.value)
                                        }}
                                    />

                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={() => { handleRegister() }}
                                    >
                                        Đăng ký
                                    </Button>
                                    <Grid container>
                                        <Grid item sx={{ mt: 2, mb: 8 }}>
                                            <Nav.Link href="login">
                                                Đăng nhập
                                            </Nav.Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Container>
                        <Snackbar
                            open={kq.alert.isOpen}
                            autoHideDuration={kq.alert.duration}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            onClose={() => {
                                setState({ alert: { ...kq.alert, isOpen: false } })
                            }}
                        >
                            <Alert
                                severity={kq.alert.type}
                                sx={{ width: '100%' }}
                            >
                                {kq.alert.message}
                            </Alert>
                        </Snackbar>
                    </ThemeProvider>
                </div>
            </div>
        </>

    );
}