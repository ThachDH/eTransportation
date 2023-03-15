import { CardActionArea, CardContent, CardMedia, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box, Tabs, Tab, Stepper, Step, StepLabel, Checkbox, FormControlLabel, IconButton, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect } from 'react'
import PlaceIcon from '@mui/icons-material/Place';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import './TicketDetail.scss';
import { CheckBox, LocationSearching, RadioButtonChecked, South } from '@mui/icons-material';
import PropTypes from 'prop-types';
import SlideTicketDetail from '../../components/dialog/SlideTicketDetail'
import EventSeatIcon from '@mui/icons-material/EventSeat';
import CircleIcon from '@mui/icons-material/Circle';

//---------------Begin tab------------------
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
//---------------End tab------------------




export default function TicketDetails2() {
  const [colorSeat, setColorSeat] = React.useState('inherit');


  const handleSelectSeat = () => {
    if (colorSeat === 'inherit') {
      setColorSeat('primary')
    }

  }
  const [selectedCheckboxes, setSelectedCheckboxes] = React.useState([]);
  const handleCheckBox = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCheckboxes([...selectedCheckboxes, value]);
    } else {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((checkboxValue) => checkboxValue !== value)
      );
    }
  };

  // const closeDialog = (event) => {
  //   setDialog({ isOpen: false })
  // }
  const [dataTrip, setDataTrip] = React.useState([])


  //---------------Begin Dialog ticket detail------------------
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [dataDialog, setDataDialog] = React.useState([])
  //---------------End Dialog ticket detail------------------

  const [dataDialog2, setDataDialog2] = React.useState([])

  const [open2, setOpen2] = React.useState(false);
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setActiveStep(0)
    setSelectedCheckboxes([])
    setOpen2(false);
    setSeats([])
  };

  //---------------Begin tab---------------
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //---------------End tab----------------

  const [activeStep, setActiveStep] = React.useState(0);
  const [seats, setSeats] = React.useState([])
  const tinhtien = () => {
    let url = `http://localhost:8080/api/user/orderTicket`;
    let temp = selectedCheckboxes.map(e => Number(e))
    let dataSend = {
      transport_id: dataDialog2.transport_id,
      user_id: Number(localStorage.getItem('id')),
      array_sit_number: temp,
      quantity: selectedCheckboxes.length
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
      .then(data => {
      })
  }

  const getCell = (item) => {
    let url = `http://localhost:8080/api/user/getCell`;
    let dataSend = {
      transport_id: item.transport_id,
      type: item.type
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
      .then(data => {
        setSeats(data.seats)
      })
  }



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
                    <Grid xs={6} className='card-detail-left'>
                      <Typography gutterBottom variant="h4" component="div">
                        {item.company_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`Xe ${item.type} chỗ`}
                      </Typography>
                      <div className='card-location'>
                        <div className='icon-tren'>
                          <RadioButtonChecked className='card-location-icon' />
                          <div> &nbsp; {`${item.depart}-${item.begin_time}`}</div>
                        </div>
                        <div className='icon-giua' > &nbsp; <br></br>  &nbsp; {item.time} <br></br> &nbsp; </div>
                        <div className='icon-duoi'>
                          <PlaceIcon className='card-location-icon' />
                          <div> &nbsp; {`${item.destination}-${item.end_time}`}</div>
                        </div>
                      </div>
                    </Grid>
                    <Grid xs={3} sx={{ paddingTop: '185px' }}>


                      <Button
                        type="button"
                        variant="text"
                        sx={{ width: 200, fontSize: 9, paddingRight: 6 }}
                        onClick={() => { setDataDialog(item); handleClickOpen() }}
                      >
                        Thông tin chi tiết vé xe {<DirectionsBusIcon />}

                      </Button>



                    </Grid>
                    <Grid xs={3} className='card-detail-right'>
                      <h4 className='price'>{`${item.price}VNĐ`}</h4>
                      <p>{`Còn ${item.type - item.seats} chỗ trống`}</p>
                      <Button variant="contained" onClick={() => { setDataDialog2(item); handleClickOpen2(); getCell(item) }}>Đặt vé</Button>

                    </Grid>
                  </Grid>

                </Grid>
              </Grid>

            </CardActionArea>
            {/* <DialogTicketDetails
              dialog={dialog}
              handleCloseDialog={(data) => closeDialog(data)}
            /> */}


          </>

        )

      })}

      {/* ------------------------------Begin dialog chitietvexe------------------------------ */}
      <Dialog open={open} onClose={handleClose}>
        <Box>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Hình ảnh" {...a11yProps(0)} />
              <Tab label="Điểm đón trả" {...a11yProps(1)} />
              <Tab label="Đặt vé" {...a11yProps(2)} />
              <DialogActions>
                <Button onClick={handleClose} sx={{ marginLeft: '300px', color: '#0000008f' }}>&times;</Button>
              </DialogActions>
            </Tabs>
          </Box>

          {/* tab1 */}
          <TabPanel value={value} index={0}>
            <SlideTicketDetail></SlideTicketDetail>
          </TabPanel>

          {/* tab2 */}
          <TabPanel value={value} index={1}>
            <DialogTitle>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Ngày khởi hành: {dataDialog.depart_date}
              </DialogContentText>
              <DialogContentText>
                Địa điểm khởi hành: {dataDialog.depart}
              </DialogContentText>
              <DialogContentText>
                Thời gian khởi hành: {dataDialog.begin_time}
              </DialogContentText>
              <DialogContentText>
                Địa điểm đến: {dataDialog.destination}
              </DialogContentText>
              <DialogContentText>
                Thời gian đến đến: {dataDialog.end_time}
              </DialogContentText>
            </DialogContent>

          </TabPanel>

          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Box>



      </Dialog>
      {/* ------------------------------End dialog chitietvexe------------------------------ */}




      {/* ------------------------------Begin dialog datve------------------------------ */}
      <Dialog open={open2} onClose={handleClose2}>
        <div style={{ margin: '10px' }}>
          <Stepper activeStep={activeStep} style={{ marginBottom: "20px" }}>
            <Step >
              <StepLabel >
                Chọn chỗ mong muốn
              </StepLabel>
            </Step>
            <Step >
              <StepLabel>
                Thông tin
              </StepLabel>
            </Step>
            <Step >
              <StepLabel>
                Thanh toán
              </StepLabel>
            </Step>
          </Stepper>
          {activeStep === 0 ?
            <Grid container>
              {seats.length <= 16 ?
                //xe duoi 16 cho ngoi
                <>
                  <Grid xs={1}></Grid>
                  <Grid xs={3} sx={{ border: '1px solid black', borderRadius: '40px' }}>
                    <CircleIcon sx={{ display: 'block', margin: '12px' }}></CircleIcon>
                    {seats.map((seats) => {
                      return (
                        <>
                          {seats.boolean === true ?
                            <Tooltip title='Hết'>
                              <FormControlLabel
                                disabled
                                value={seats.sit_number}
                                control={<Checkbox icon={<EventSeatIcon fontSize='large' />} />}
                                onClick={handleCheckBox}
                                sx={{ margin: 'auto' }} />
                            </Tooltip>
                            :
                            <Tooltip title={'Ghế: ' + seats.sit_number} arrow >
                              <FormControlLabel
                                value={seats.sit_number}
                                control={<Checkbox icon={<EventSeatIcon fontSize='large' />} checkedIcon={<EventSeatIcon fontSize='large' />} />}
                                onClick={handleCheckBox}
                                sx={{ margin: 'auto' }} ></FormControlLabel>
                            </Tooltip>
                          }
                        </>
                      )
                    })}
                  </Grid>
                  <Grid xs={4}></Grid>
                  <Grid xs={4}>
                    <div>&nbsp;</div>

                    <div>
                      <EventSeatIcon color='disabled' fontSize='large' />&nbsp;&nbsp;:  Đã hết
                    </div>
                    <div>&nbsp;</div>
                    <div>
                      <EventSeatIcon style={{ color: 'rgba(0, 0, 0, 0.6)' }} fontSize='large' />&nbsp;&nbsp;:  Còn trống
                    </div>
                    <div>&nbsp;</div>

                    <div>
                      <EventSeatIcon color='primary' fontSize='large' />&nbsp;&nbsp;:  Đang chọn
                    </div>
                    <div>&nbsp;</div>

                    Số ghế đang chọn:
                    {selectedCheckboxes.map((selectedCheckboxes) => {
                      return (
                        ' ' + selectedCheckboxes
                      )
                    })}
                  </Grid>

                </> :
                //xe lon hon 45 cho 
                <>
                  <Grid xs={1}></Grid>

                  <Grid xs={4} sx={{ border: '1px solid black', borderRadius: '40px' }}>

                    <CircleIcon sx={{ display: 'block', margin: '12px' }}></CircleIcon>

                    {seats.map((seats) => {
                      return (
                        <>
                          {seats.boolean === true ?
                            <FormControlLabel
                              disabled
                              value={seats.sit_number}
                              control={<Checkbox icon={<EventSeatIcon fontSize='large' />} />}
                              title={'Ghế: ' + seats.sit_number}
                              onClick={handleCheckBox}
                              sx={{ margin: 'auto' }} />
                            :
                            <Tooltip title={'Ghế: ' + seats.sit_number} arrow >
                              <FormControlLabel
                                value={seats.sit_number}
                                control={<Checkbox icon={<EventSeatIcon fontSize='large' />} checkedIcon={<EventSeatIcon fontSize='large' />} />}
                                onClick={handleCheckBox}
                                sx={{ margin: 'auto' }} ></FormControlLabel>
                            </Tooltip>

                          }
                        </>
                      )
                    })}

                  </Grid>
                  <Grid xs={3}></Grid>
                  <Grid xs={4}>  <div>&nbsp;</div>

                    <div>
                      <EventSeatIcon color='disabled' fontSize='large' />&nbsp;&nbsp;:  Đã hết
                    </div>
                    <div>&nbsp;</div>
                    <div>
                      <EventSeatIcon style={{ color: 'rgba(0, 0, 0, 0.6)' }} fontSize='large' />&nbsp;&nbsp;:  Còn trống
                    </div>
                    <div>&nbsp;</div>

                    <div>
                      <EventSeatIcon color='primary' fontSize='large' />&nbsp;&nbsp;:  Đang chọn
                    </div>
                    <div>&nbsp;</div>

                    Số ghế đang chọn:
                    {selectedCheckboxes.map((selectedCheckboxes) => {
                      return (
                        ' ' + selectedCheckboxes
                      )
                    })}
                  </Grid>

                </>}



            </Grid>
            : ""}

          {/* -----------------------Begin step 2----------------------- */}
          {activeStep === 1 ?
            <>
              <p style={{ margin: '3% 0% 0% 5%' }}>
                {console.log(dataDialog2)}
                <p>Nhà xe: {dataDialog2.company_name}</p>
                <p>Loại xe: {dataDialog2.transport_name} {dataDialog2.type} chỗ</p>
                <p>Điểm đón: {dataDialog2.depart}</p>
                <p>Thời gian khởi hành: {dataDialog2.depart_date} {dataDialog2.begin_time}</p>

                <p>Điểm đến: {dataDialog2.destination}</p>
                <p>Thời gian đến (dự tính): {dataDialog2.end_time}</p>
                <p>Giá vé: {dataDialog2.price} VNĐ</p>

                <p>Số lượng vé: x{selectedCheckboxes.length} </p>
                <p>Số ghế: {selectedCheckboxes.map((selectedCheckboxes) => {
                  return (
                    ' ' + selectedCheckboxes
                  )
                })} </p>
              </p>

              <h5 style={{ textAlign: 'center' }}>Tổng giá vé: {`${selectedCheckboxes.length * dataDialog2.price}`} VNĐ</h5>
              <em className='luuydatve'><p style={{ color: 'rgb(25, 141, 14)' }}>Lưu ý:&nbsp;</p><p>Vui lòng kiểm kỹ thông tin trước khi đặt vé!!! </p> </em>
            </>
            : ""
          }
          {/* -----------------------End step 2----------------------- */}



          {/* -----------------------Begin nut button----------------------- */}
          {activeStep === 0 ?
            <>
              {selectedCheckboxes.length === 0 ?
                <Button style={{ bottom: '19%', right: '32.5%', position: 'fixed' }} disabled >Tiếp tục</Button> : <Button style={{ bottom: '19%', right: '32.5%', position: 'fixed' }} onClick={(e) => { setActiveStep(activeStep + 1) }}>Tiếp tục</Button>
              }
            </>
            :
            <>
              {activeStep === 1 ?
                <>
                  <Button style={{ bottom: '19%', right: '32.5%', position: 'fixed' }} onClick={(e) => { setActiveStep(activeStep + 1) }}>Tiếp tục</Button>
                  <Button style={{ bottom: '19%', position: 'fixed' }} onClick={(e) => { setActiveStep(activeStep - 1); setSelectedCheckboxes([]) }}>Quay lại</Button>
                </>
                :
                <>
                  {activeStep === 2 ?
                    <>
                      <Button style={{ bottom: '19%', position: 'fixed' }} onClick={(e) => { setActiveStep(activeStep - 1); }}>Quay lại</Button>
                      <Button style={{ bottom: '19%', right: '32.5%', position: 'fixed' }} onClick={(e) => { tinhtien() }}>Hoàn tất</Button>
                    </>
                    :
                    <>
                    </>}
                </>}
            </>
          }


          {/* -----------------------End nut button----------------------- */}
        </div>
      </Dialog>
      {/* ------------------------------End dialog dat ve------------------------------ */}
    </>
  )
}
