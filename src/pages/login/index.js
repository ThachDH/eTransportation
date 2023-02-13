import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import background from "../../assets/background.jpg"
import "./index.scss"
import { Link, useNavigate, NavLink } from 'react-router-dom';
import Navigation from '../../components/navigation/Nav';
import { useState } from 'react';
import { Nav } from 'react-bootstrap';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Login() {
    const navigate = useNavigate()
    const [getEmail, setEmail] = useState('');
    const [getPass, setPass] = useState('');

    const handleSubmit = (event) => {
        // if (getEmail === 'test' && getPass === 'test123') {
        //      navigate(`/home`)
        // }


        let url = `http://localhost:8080/api/login`;
        let dataSend = {
            email: getEmail,
            password: getPass
        }
        fetch(url, {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
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
            .then((data) => {
                if (data.userId !== undefined) {
                    navigate(`/home`)

                }
            })
            .catch((err) => {
                return err;
            })

    };

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
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Đăng nhập
                                </Typography>
                                <Box component="form" noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={(e) => {
                                            setPass(e.target.value)
                                        }}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"
                                    />
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}

                                        onClick={() => handleSubmit()}
                                    // component={Link} to='/home'

                                    >
                                        Đăng nhập
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Nav.Link href="#">
                                                Quên mật khẩu?
                                            </Nav.Link>
                                        </Grid>
                                        <Grid item>
                                            <Nav.Link href="register">
                                                Đăng ký tài khoản
                                            </Nav.Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                            <Copyright sx={{ mt: 8, mb: 4 }} />
                        </Container>
                    </ThemeProvider>
                </div>
            </div>
        </>

    );
}