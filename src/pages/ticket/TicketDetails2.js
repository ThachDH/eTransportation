import { CardActionArea, CardContent, CardMedia, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box, Tabs, Tab, Stepper, Step, StepLabel, Checkbox, FormControlLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect } from 'react'
import PlaceIcon from '@mui/icons-material/Place';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import './TicketDetail.scss';
import { CheckBox, LocationSearching, RadioButtonChecked, South } from '@mui/icons-material';
import PropTypes from 'prop-types';
import SlideTicketDetail from '../../components/dialog/SlideTicketDetail'

let arr = [1, 2, 3, 4, 5]

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

  const [open2, setOpen2] = React.useState(false);
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setActiveStep(0)
    setSelectedCheckboxes([])
    setOpen2(false);
  };
  const [dataDialog2, setDataDialog2] = React.useState([])

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
      transport_id : dataDialog2.transport_id,
      user_id : Number(localStorage.getItem('id')),
      array_sit_number : temp,
      quantity : selectedCheckboxes.length
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
        console.log(data)
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
        <>
          <Stepper activeStep={activeStep} style={{ marginBottom: "20px" }}>
            <Step >
              <StepLabel >
                Chọn chỗ mong muốn
              </StepLabel>
            </Step>
            <Step >
              <StepLabel>
                Tính tiền
              </StepLabel>
            </Step>
            <Step >
              <StepLabel>
                Thanh toán
              </StepLabel>
            </Step>
          </Stepper>
          {activeStep === 0 ?
            <>
              {seats.map(cell => (
                cell.boolean ?
                  <FormControlLabel
                    disabled
                    checked
                    value={cell.sit_number}
                    control={<Checkbox />}
                    label={cell.sit_number}
                    labelPlacement="top"
                    onChange={(e) => handleCheckBox(e)}
                  />
                  :
                  <FormControlLabel
                    value={cell.sit_number}
                    control={<Checkbox />}
                    label={cell.sit_number}
                    labelPlacement="top"
                    onChange={(e) => handleCheckBox(e)}
                  />
              ))}
            </>
            : ""}

          {activeStep === 1 ?
            <>
              <h1>{selectedCheckboxes.length}</h1>
              <h1>{`${selectedCheckboxes.length * dataDialog2.price}`}</h1>
            </>
            : ""
          }

          {activeStep !== 0 ? <Button onClick={(e) => {
            setActiveStep(activeStep - 1);
            setSelectedCheckboxes([])
          }}>
            Quay lại
          </Button> : ''}

          {activeStep === 2 ? <Button onClick={(e) => {tinhtien() }}>
            Hoàn tất
          </Button> : <Button onClick={(e) => { setActiveStep(activeStep + 1) }}>
            tiếp tục
          </Button>}
        </>
      </Dialog>
      {/* ------------------------------End dialog datve------------------------------ */}
    </>
  )
}
