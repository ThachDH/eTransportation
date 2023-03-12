import {
  CardActionArea, CardContent, CardMedia, Typography, Button, Stepper,
  Step,
  StepLabel,
  Divider,
  Chip,
  Stack
} from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect } from 'react'
import PlaceIcon from '@mui/icons-material/Place';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import './TicketDetail.scss';
import { LocationSearching, RadioButtonChecked, South } from '@mui/icons-material';
import DialogTicketDetails from '../../components/dialog/DialogTicketDetails';
import { height, width } from '@mui/system';

export default function TicketDetails2() {
  // const closeDialog = (event) => {
  //   setDialog({ isOpen: false })
  // }
  const [dataTrip, setDataTrip] = React.useState([])
  const [seeMore, setSeeMore] = React.useState(false)
  const [booking, setBooking] = React.useState(false)

  const [activeStep, setActiveStep] = React.useState(1)
  const [quantity, setQuantity] = React.useState(0);
  useEffect(() => {
    let url = `http://localhost:8080/api/getAllTrips`;
    fetch(url, {
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(),

    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new `Error`(text);
        }
        return res.json();
      })
      .then(data => {
        setDataTrip(data.result)
      })
  }, [])
  return (
    <>
      {dataTrip.map((item) => {
        return (
          <>
            <CardActionArea className='card-container' >
              <Grid container  >
                <Grid xs={4.5} >
                  <CardMedia className='card-img'
                    component="img"
                    alt=""
                    src={item.image_path}
                  />
                </Grid>
                <Grid xs={7.5}>
                  <Grid container >
                    <Grid xs={7} className='card-detail-left'>
                      <Typography gutterBottom variant="h4" component="div">
                        {item.company_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`Xe loại ${item.type} chỗ`}
                      </Typography>
                      <div className='card-location'>
                        <div className='icon-tren'>
                          <RadioButtonChecked className='card-location-icon' />
                          <div> &nbsp; {`${item.depart} ${item.begin_time}`}</div>
                        </div>
                        <div className='icon-giua' > &nbsp; <br></br>  &nbsp; {item.time} <br></br> &nbsp; </div>
                        <div className='icon-duoi'>
                          <PlaceIcon className='card-location-icon' />
                          <div> &nbsp; {`${item.destination}-${item.end_time}`}</div>
                        </div>
                      </div>
                    </Grid>
                    <Grid xs={2.5} sx={{ paddingTop: '197px' }}>
                      {/* <a href=''>Thông tin chi tiết</a> */}
                      <Button
                        type="button"
                        variant="text"
                        sx={{ width: 200, fontSize: 9, paddingRight: 6 }}
                        onClick={() => setSeeMore(!seeMore)}
                      >
                        Thông tin chi tiết vé xe {<DirectionsBusIcon />}
                      </Button>

                    </Grid>
                    <Grid xs={2.5} className='card-detail-right'>
                      <h4 className='price'>{`${item.price}VNĐ`}</h4>
                      <p>{`Còn ${item.type - item.seats} chỗ trống`}</p>
                      <Button variant="contained" onClick={(e) => setBooking(!booking)}>Đặt vé</Button>

                    </Grid>
                  </Grid>

                </Grid>
              </Grid>

            </CardActionArea>
            {/* <DialogTicketDetails
              dialog={dialog}
              handleCloseDialog={(data) => closeDialog(data)}
            /> */}
            {seeMore && (
              <div style={{ width: 400, height: 800, backgroundColor: 'red', marginTop: -16 }}>

              </div>
            )}
            {
              booking && (
                <div style={{ width: 900, height: 400, backgroundColor: 'pink', marginTop: -16 }}>
                  <Stepper activeStep={activeStep} style={{ marginBottom: "20px" }}>
                    <Step key="booking1">
                      <StepLabel>
                        Chọn số ghế
                      </StepLabel>
                    </Step>
                    <Step key="booking2">
                      <StepLabel>
                        Nhập thông tin cá nhân
                      </StepLabel>
                    </Step>
                    <Step key="booking3">
                      <StepLabel>
                        Thanh toán
                      </StepLabel>
                    </Step>
                  </Stepper>
                  {/* ------------------------------- start - CHọn ghế ---------------------------- */}
                  {
                    activeStep === 1 ?
                      <>
                        <Grid container>
                          <Grid item xs={12}>
                            <Stack direction='row'>
                              <Typography sx={{ fontWeight: 'bold' }}> Số lượng : </Typography>
                              <Stack direction='row'>
                                <Button onClick={(e) => {
                                  if (quantity > 0) {
                                    setQuantity(quantity - 1)
                                  }
                                }}>-</Button>
                                <span>{quantity}</span>
                                <Button onClick={(e) => {
                                  if (quantity < (item.type - item.seats)) {
                                    setQuantity(quantity + 1)
                                  }
                                }}>+</Button>
                              </Stack>
                            </Stack>

                          </Grid>
                        </Grid>
                        <Divider>
                          <Chip label="Tạm tính" />
                        </Divider>
                        <Stack direction='row'
                          justifyContent="space-between"
                          alignItems="flex-end">
                          <Typography> {`Ghế: ${quantity} khách`}</Typography>
                          <Typography> {`Tổng tiền: ${quantity * item.price} VND`}</Typography>
                        </Stack>
                      </>
                      : ''
                  }
                  {/* ------------------------------------end- Chọn ghế----------------------------------- */}
                  <Stack direction='row'
                    sx={{mb : 1}}>
                    <Button
                      onClick={() => setActiveStep(2)}
                    >
                      Tiếp tục
                    </Button>
                  </Stack>

                </div>
              )}
          </>
        )
      })}
    </>
  )
}
