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
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


const theme = createTheme();
export default function Login() {
	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});
	const [kq, setState] = useState({
		alert: {
			isOpen: false,
			message: '',
			duration: 0,
			type: ''
		}
	});
	const navigate = useNavigate()
	const [getEmail, setEmail] = useState('');
	const [getPass, setPass] = useState('');
	const [getID, setID] = useState('');


	const handleSubmit = (event) => {

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
					throw new `Error`(text);
				}
				return res.json();
			})
			.then((data) => {
				console.log(data)
				if (data.status === 0) {
					setState({
						alert: {
							isOpen: true,
							message: "Tài khoản của bạn đã bị khóa !!!",
							duration: 1500,
							type: 'error',
						}
					});
				}
				else if (data.data === false) {
					setState({
						alert: {
							isOpen: true,
							message: data.message,
							duration: 1500,
							type: 'error',
						}
					});
					return
				}
				else {
					if (data.userId !== undefined || data.companyId !== undefined) {
						if (data.role === 'USER') {
							navigate(`/home`)
						}
						else if (data.role === 'ADMIN') {
							navigate(`/admin-page`)
						} else if (data.role === 'COMPANY') {
							navigate(`/company-route`)
						}
						localStorage.setItem('id', data.userId ? data.userId : data.companyId);
						localStorage.setItem('email', getEmail);
						localStorage.setItem('password', getPass);
						localStorage.setItem('role', data.role);
						localStorage.setItem('user_name', data.user_name);
					}
				}
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
										<Grid item xs sx={{ mb: 14, mt: 3 }}>
											<Nav.Link href="#">
												Quên mật khẩu?
											</Nav.Link>
										</Grid>
										<Grid item sx={{ mb: 14, mt: 3 }}>
											<Nav.Link href="register">
												Đăng ký tài khoản
											</Nav.Link>
										</Grid>
									</Grid>
								</Box>
							</Box>
						</Container>
					</ThemeProvider>
					<Snackbar
						open={kq.alert.isOpen}
						autoHideDuration={kq.alert.duration}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left'
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
				</div>
			</div>
		</>

	);
}