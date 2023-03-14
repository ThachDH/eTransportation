import { CardActionArea, CardContent, CardMedia, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box, Tabs, Tab } from '@mui/material';

import Grid from '@mui/material/Grid';
import React, { useEffect } from 'react'
import PlaceIcon from '@mui/icons-material/Place';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import './TicketDetail.scss';
import { LocationSearching, RadioButtonChecked, South } from '@mui/icons-material';
import DialogTicketDetails from '../../components/dialog/DialogTicketDetails';
import { height, width } from '@mui/system';
import { Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SlideTicketDetail from '../../components/dialog/SlideTicketDetail'



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

  //---------------Begin tab---------------
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //---------------End tab----------------


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
        console.log(data)
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
                          <div> &nbsp; {`${item.depart} ${item.begin_time}`}</div>
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
                </div>
              )}
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
                <Button onClick={handleClose} sx={{ marginLeft: '300px' }}>&times;</Button>
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


    </>
  )
}
