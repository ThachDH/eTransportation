import { CardActionArea, CardContent, CardMedia, Typography, Button } from '@mui/material';
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

  const [dialog, setDialog] = React.useState(
    {
      isOpen: false,
      data: null,
    },
  )
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
                        {`Xe loại ${item.type}`}
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
                      <Button variant="contained">Đặt vé</Button>

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

          </>
        )
      })}
    </>
  )
}
