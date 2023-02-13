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
import { Visibility, VisibilityOff } from '@mui/icons-material';




export default function Register() {
    const theme = createTheme();
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
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
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="given-name"
                                                name="firstName"
                                                required
                                                fullWidth
                                                id="firstName"
                                                label="Họ"
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="lastName"
                                                label="Tên"
                                                name="lastName"
                                                autoComplete="family-name"
                                            />
                                        </Grid>

                                    </Grid>

                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus

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
                                                autoComplete="current-password">

                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={4} mt={2.6}>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
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
                                    />

                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}


                                    // component={Link} to='/home'

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
                    </ThemeProvider>
                </div>
            </div>
        </>

    );
}