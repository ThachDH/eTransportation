
import { Accordion, AccordionDetails, AccordionSummary, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react'

import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function UserInforManage() {
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    useEffect(() => {
        let urlForGetPass = `http://localhost:8080/api/login`;
        let dataSend = {
            email: localStorage.getItem('email'),
            password: localStorage.getItem('password')
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
                console.log(data)

                setEmail(data.user_email)
                setName(data.user_name)
                setPassword(localStorage.getItem('password'))
                setPhoneNumber(data.phone_number)

            })
    }, []);
    const [oldPass, setOldPass] = React.useState('');
    const [newPass1, setNewPass1] = React.useState('');
    const [newPass2, setNewPass2] = React.useState('');
    const [messageChangePass, setMessageChangepass] = React.useState('');
    const [colorMessageChangepass, setColorMessageChangepass] = React.useState('');


    const handleChangePass = () => {
        const regex = /^.{6,}/i;
        if (oldPass !== password) {
            setMessageChangepass('Mật khẩu cũ không đúng!!!')
            setColorMessageChangepass('red')
        }
        else if (!regex.test(newPass1) || !regex.test(newPass2)) {
            setMessageChangepass('Mật khẩu cần có ít nhất 6 ký tự !!!')
            setColorMessageChangepass('red')
        }
        else if (newPass1 !== newPass2) {
            setMessageChangepass('Mật khẩu nhập lại chưa đúng !!!')
            setColorMessageChangepass('red')
        } else {
            if (password === oldPass) {
                let url = `http://localhost:8080/api/user/resetPassword`;
                let dataSend = {
                    email: email,
                    password: newPass1,
                    confirmPassword: newPass2
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

                    }).then((data) => {
                        localStorage.setItem('password', newPass1)
                        setMessageChangepass('Đổi mật khẩu thành công!!!')
                        setColorMessageChangepass('green')
                        console.log(data)
                    })

            } else {
                alert('mk cu k dung')
            }


        }


    }

    return (

        <>
            <Container sx={{ marginTop: '20px', marginBottom: '20px', width: '50%' }}>
                <h1 style={{ textAlign: 'center' }}>Thông tin tài khoản</h1>

                <Accordion>
                    <AccordionSummary>
                        <Typography sx={{ width: '35%', flexShrink: 0 }}>
                            Email:
                        </Typography>
                        <Typography sx={{ width: '35%', color: 'text.secondary' }}>{email}</Typography>
                    </AccordionSummary>
                </Accordion>

                <Accordion>
                    <AccordionSummary>
                        <Typography sx={{ width: '35%', flexShrink: 0 }}>
                            Tên:
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{name}</Typography>
                    </AccordionSummary>
                </Accordion>

                <Accordion>
                    <AccordionSummary>
                        <Typography sx={{ width: '35%', flexShrink: 0 }}>
                            Số điện thoại:
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{phoneNumber}</Typography>
                    </AccordionSummary>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<EditIcon></EditIcon>}>
                        <Typography sx={{ width: '35%', flexShrink: 0 }}>
                            Mật khẩu:
                        </Typography>
                        <Typography sx={{ marginLeft: '9px', color: 'text.secondary' }}>************</Typography>
                    </AccordionSummary>
                    {localStorage.getItem('loginByGoogle') ? <AccordionDetails>Tài khoản được đăng nhập bằng tài khoản Google !!!</AccordionDetails> : <>
                        <AccordionDetails>
                            <TextField
                                type="password"
                                label="Nhập mật khẩu cũ"
                                variant="standard"
                                focusedfocused
                                sx={{ marginBottom: '5%', width: '100%' }}
                                onChange={(e) => { setOldPass(e.target.value); }} />
                            <TextField
                                type="password"
                                label="Nhập mật khẩu mới"
                                variant="standard"
                                focusedfocused
                                sx={{ marginRight: '32%' }}
                                onChange={(e) => { setNewPass1(e.target.value); }} />
                            <TextField
                                type="password"
                                label="Nhập lại mật khẩu mới"
                                variant="standard"
                                focusedfocused
                                onChange={(e) => { setNewPass2(e.target.value); }} />
                            {messageChangePass && <Typography sx={{ marginTop: '20px', color: colorMessageChangepass }}>{messageChangePass}</Typography>}
                            <Button onClick={handleChangePass} sx={{ display: 'block', marginTop: '20px', marginLeft: '80%' }}>Xác nhận</Button>
                        </AccordionDetails>
                    </>}


                </Accordion>

            </Container>
        </>
    )
}
