import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';

export default function Error() {
    const id = useParams();
    localStorage.clear();
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}
        >
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid xs={6}>
                        <Typography variant="h1">
                            404
                        </Typography>
                        {id.id === '1' &&
                            <Typography variant="h6">
                                Bạn cần đăng nhập để vào trang ADMIN!
                            </Typography>
                        }
                        {id.id === '2' &&
                            <Typography variant="h6">
                                Bạn cần đăng nhập bằng tài khoản công ty để vào trang COMPANY!
                            </Typography>
                        }
                        {id.id === '3' &&
                            <Typography variant="h6">
                                Bạn cần đăng nhập bằng tài khoản khách hàng để mua vé!
                            </Typography>
                        }

                        <Button href='/login' variant="contained" sx={{ marginTop: '20px' }}>Trờ về trang đăng nhập</Button>
                    </Grid>
                    <Grid xs={6}>
                        <img
                            src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                            alt=""
                            width={500} height={250}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}