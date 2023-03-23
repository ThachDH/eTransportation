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


import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../firebaseConfig';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


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

	const [emailForGetPass, setEmailForGetPass] = React.useState('');
	const [messageForGetPass, setMessageForGetPass] = React.useState('');
	const [colorMessageForGetPass, setColorMessageForGetPass] = React.useState('');

	const handleSubmitForgetPass = () => {
		const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		if (regex.test(emailForGetPass)) {
			setColorMessageForGetPass('green')
			let urlForGetPass = `http://localhost:8080/api/user/forgetPassword`;
			let dataSend = {
				email: emailForGetPass,
			}
			fetch(urlForGetPass, {
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
					if (data.data) {
						setMessageForGetPass('Gửi thành công. Vui lòng kiểm tra email của bạn!!!')
					} else {
						setColorMessageForGetPass('red')
						setMessageForGetPass(data.message)
					}
				})

		} else {
			setMessageForGetPass('Địa chỉ email không hợp lệ. Vui lòng nhập lại!!!')
			setColorMessageForGetPass('red')
		}

	}


	//------------------Dialog quen mat khau------------------
	const [forGetPass, setForGetPass] = React.useState(false);

	const openForGetPass = () => {
		setForGetPass(true);
	};

	const closeForGetPass = () => {
		setForGetPass(false);
		setMessageForGetPass('')
		setEmailForGetPass('')
	};
	//------------------Dialog quen mat khau------------------

	const loginWithGoogle = () => {
		signInWithPopup(auth, provider)
			.then((res) => {
				localStorage.setItem('user', JSON.stringify(res.user))
				let dataSend = {
					email: res.user.email,
					name: res.user.displayName,
					password: res.user.uid,
					phone_number: '000000'
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
					}).then(data => {
						//login
						let urlLogin = `http://localhost:8080/api/login`;
						let dataSendLogin = {
							email: res.user.email,
							password: res.user.uid
						}
						fetch(urlLogin, {
							method: "POST",
							mode: 'cors',
							headers: {
								'Content-Type': 'application/json',
								"Access-Control-Allow-Origin": "*",
							},
							body: JSON.stringify(dataSendLogin),

						})
							.then(async (res) => {
								if (!res.ok) {
									const text = await res.text();
									throw new `Error`(text);
								}
								return res.json();

							})
							.then((dataLogin) => {

								if (dataLogin.data === false) {
									setState({
										alert: {
											isOpen: true,
											message: "Email này đã được đăng ký bằng tài khoản đăng nhập. Vui lòng đăng nhập bằng tài khoản!!!",
											duration: 4000,
											type: 'warning',
										}
									});
								}
								else if (dataLogin.status === 0) {
									setState({
										alert: {
											isOpen: true,
											message: "Tài khoản của bạn đã bị khóa !!!",
											duration: 1500,
											type: 'error',
										}
									});
								}
								else {
									if (dataLogin.userId !== undefined || dataLogin.companyId !== undefined) {
										if (dataLogin.role === 'USER') {
											navigate(`/home`)
										}
										else if (dataLogin.role === 'ADMIN') {
											navigate(`/admin-page`)
										} else if (dataLogin.role === 'COMPANY') {
											navigate(`/company-page`)
										}
										localStorage.setItem('id', dataLogin.userId ? dataLogin.userId : dataLogin.companyId);
										localStorage.setItem('email', res.user.email);
										localStorage.setItem('password', res.user.uid);
										localStorage.setItem('role', dataLogin.role);
										localStorage.setItem('user_name', dataLogin.user_name ? dataLogin.user_name : dataLogin.companyName);
										localStorage.setItem('loginByGoogle', 'loginByGoogle');

									}
								}
							})
					})


			})
			.catch((err) => {
				console.log(err)
			})
	}



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
							navigate(`/company-page`)
						}
						localStorage.setItem('id', data.userId ? data.userId : data.companyId);
						localStorage.setItem('email', getEmail);
						localStorage.setItem('password', getPass);
						localStorage.setItem('role', data.role);
						localStorage.setItem('user_name', data.user_name ? data.user_name : data.companyName);
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
										label="Email"
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
										label="Mật khẩu"
										type="password"
										id="password"
										autoComplete="current-password"
										onChange={(e) => {
											setPass(e.target.value)
										}}
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
									<Button sx={{ display: 'block', margin: 'auto' }} onClick={loginWithGoogle}>Đăng nhập bằng tài khoản Google</Button>
									<Grid container>
										<Grid item xs sx={{ mb: 14, mt: 3 }}>
											<Nav.Link onClick={openForGetPass}>
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
			{<Dialog
				open={forGetPass}
				onClose={closeForGetPass}
				sx={{ width: '38.8%', height: '37%', position: 'fixed', left: '30%', top: '35%' }}
			>
				<DialogTitle sx={{ paddingBottom: '0px' }}>
					{"Bạn đã quên mật khẩu?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Vui lòng nhập địa chỉ email đã đăng ký của bạn để nhận được thông tin mật khẩu.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="email"
						required="required"
						label="Địa chỉ Email"
						type="email"
						fullWidth
						variant="standard"
						onChange={(e) => { setEmailForGetPass(e.target.value); }} />
					{messageForGetPass && <DialogContentText sx={{ marginTop: '10px', color: colorMessageForGetPass }}>
						{messageForGetPass}
					</DialogContentText>}


				</DialogContent>
				<DialogActions>
					<Button onClick={closeForGetPass} >
						Hủy
					</Button>
					<Button onClick={handleSubmitForgetPass} >
						Gửi
					</Button>
				</DialogActions>
			</Dialog>}
		</>

	);
}