import { CardActionArea, CardContent, CardMedia, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react'
import PlaceIcon from '@mui/icons-material/Place';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import './TicketDetail.scss';
import { LocationSearching, RadioButtonChecked, South } from '@mui/icons-material';
import DialogTicketDetails from '../../components/dialog/DialogTicketDetails';

export default function TicketDetails2() {
    const closeDialog = (event) => {
        setDialog({ isOpen: false })
    }
    const [dialog, setDialog] = React.useState(
        {
            isOpen: false,
            data: null,
        },
    )
    return (
        <>
            <h3 style={{ marginLeft: '15px' }}>Đặt vé xe đi Hà Nội từ Hải Phòng ngày ...</h3>
            <CardActionArea className='card-container' >
                <Grid container  >
                    <Grid xs={4.5} >
                        <CardMedia className='card-img'
                            component="img"
                            alt=""
                            src='https://static1.cafeland.vn/cafeauto/hinh-anh/2022/08/05/156/l0.jpg'
                        />
                    </Grid>
                    <Grid xs={7.5}>
                        <Grid container >
                            <Grid xs={7} className='card-detail-left'>
                                <Typography gutterBottom variant="h4" component="div">
                                    Limosin
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Ghế ngồi 16 chỗ
                                </Typography>
                                <div className='card-location'>
                                    <div className='icon-tren'>
                                        <RadioButtonChecked className='card-location-icon' />
                                        <div> &nbsp; Thoi Gian - Dia Diem</div>
                                    </div>
                                    <div className='icon-giua' > &nbsp; <br></br>  &nbsp; 1h30p <br></br> &nbsp; </div>
                                    <div className='icon-duoi'>
                                        <PlaceIcon className='card-location-icon' />
                                        <div> &nbsp; Thoi Gian - Dia Diem</div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid xs={2.5} sx={{ paddingTop: '197px' }}>
                                {/* <a href=''>Thông tin chi tiết</a> */}
                                <Button
                                    
                                    type="button"
                                    variant="text"
                                    sx={{ width: 200, fontSize: 9 ,paddingRight: 6}}
                                    onClick={() => setDialog({
                                        isOpen: true
                                    })}
                                >
                                    Thông tin chi tiết vé xe {<DirectionsBusIcon/>}
                                </Button>

                            </Grid>
                            <Grid xs={2.5} className='card-detail-right'>
                                <h4 className='price'>120000đ</h4>
                                <p>Còn...chỗ trống</p>
                                <Button variant="contained">Đặt vé</Button>

                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </CardActionArea>
            <DialogTicketDetails
                    dialog={dialog}
                    handleCloseDialog={(data) => closeDialog(data)}

                />
        </>
    )
}
