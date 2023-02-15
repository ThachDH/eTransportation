import { CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react'
import PlaceIcon from '@mui/icons-material/Place';

import './TicketDetail.scss';
import { LocationSearching, RadioButtonChecked, South } from '@mui/icons-material';

export default function TicketDetails2() {


    return (
        <>
            <h3 style={{ marginLeft: '15px' }}>Đặt vé xe đi Hà Nội từ Hải Phòng ngày ...</h3>
            <CardActionArea className='card-container' >
                <Grid container  >
                    <Grid xs={4} >
                        <CardMedia className='card-img'
                            component="img"
                            alt=""
                            src='https://static1.cafeland.vn/cafeauto/hinh-anh/2022/08/05/156/l0.jpg'
                        />
                    </Grid>
                    <Grid xs={8} >
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Limosin
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Ghế ngồi 16 chỗ
                            </Typography>
                            <div className='card-location'>
                                <div className='icon-tren'>
                                    <RadioButtonChecked className='card-location-icon' />
                                    <div> &nbsp; Dia Diem - Thoi Gian</div>
                                </div>
                                <div className='card-location-dot' > &nbsp; <br></br>  &nbsp; 1h30p <br></br> &nbsp; </div>
                                <div className='icon-duoi'>
                                    <PlaceIcon className='card-location-icon' />
                                    <div> &nbsp; Dia Diem - Thoi Gian</div>
                                </div>
                            </div>

                        </CardContent>
                    </Grid>
                </Grid>
            </CardActionArea>
            <CardActionArea className='card-container' >
                <Grid container  >
                    <Grid xs={4} >
                        <CardMedia className='card-img'
                            component="img"
                            alt=""
                            src='https://storage.googleapis.com/blogvxr-uploads/2022/04/LESO3679-HDR-min-752x440.jpg'
                        />
                    </Grid>
                    <Grid xs={8} >
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </CardActionArea>
            <CardActionArea className='card-container' >
                <Grid container  >
                    <Grid xs={4} >
                        <CardMedia className='card-img'
                            component="img"
                            alt=""
                            src='https://xetaibaoloc.com/images/stories/virtuemart/product/resized/mobihomestandard_1200x660_ngoaithat_640x480.jpg'
                        />
                    </Grid>
                    <Grid xs={8} >
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </CardActionArea>

        </>
    )
}
