import React from "react";
import {
  Box,
  Button,
  Checkbox,
  CardContent,
  Grid,
  Divider,
  FormControl,
  Radio,
  Paper,
  Chip,
  Stack,
  Card,
  FormControlLabel,
  IconButton,
  RadioGroup,
  InputBase,
  TextField,
  Input,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import AdjustIcon from '@mui/icons-material/Adjust';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Picktime from './Picktime';
import moment from "moment";

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departDid: [],
      destinationDid: [],
      departS: '',
      destinationS: '',
      depart_dateS: '',

      arrTicketSearch: [],
    }

  }
  componentDidMount() {
    this.apiRoute()
  }
  apiRoute() {
    //API view Route
    let url = `http://localhost:8080/api/company/getRoutesByComId`;
    let dataSend = {
      company_id: Number(localStorage.getItem('id'))
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
        if (data.result.length > 0) {
          let tempdepart = data.result.map(e => e.depart)
          let tempDetination = data.result.map(e => e.destination)
          this.setState({
            departDid: tempdepart,
            destinationDid: tempDetination
          })
        }
      })
  }
  handleSearch() {
    let url = `http://localhost:8080/api/getTrips`;
    let dataSend = {
      depart: this.state.departS,
      destination: this.state.destinationS,
      depart_date: this.state.depart_dateS
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
        if (data.data) {
          console.log('asd')
          this.props.handleChange(data.result)

          // this.setState({
          //   arrTicketSearch: data.result
          // })
        } else {
          this.props.handleChange([])

          // this.setState({
          //   arrTicketSearch: []
          // })
        }
      })
  }
  render() {
    return (
      <Paper
        elevation={6}
        sx={{ backgroundColor: '#e9edf1', width: "850px", height: "130px", borderRadius: "10px" }}
      >
        <Button
          sx={{ marginLeft: '15px', marginTop: '10px', border: 0 }}
          type="button"
          variant="outlined"
          startIcon={<DirectionsBusIcon />}>
          Xe khách
        </Button>

        <Stack direction="row" spacing={2} sx={{ marginTop: '10px', marginLeft: '15px' }}>
          <Paper
            component="form"
            sx={{ display: 'flex', alignItems: 'center', width: "650px", border: 1, borderColor: '#e6e6e6', height: "55px", }}>
            <IconButton sx={{ p: '10px' }} aria-label="menu">
              <AdjustIcon />
            </IconButton>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={this.state.departDid}
              sx={{ width: 260 }}
              onChange={(e, i) => {
                this.setState({
                  departS: i
                })
              }}
              renderInput={(params) => <TextField {...params} label="Nơi xuất phát" />}
            />
            <Divider>
              <ChangeCircleIcon />
            </Divider>
            <IconButton sx={{ p: '20px' }} aria-label="menu">
              <AdjustIcon />
            </IconButton>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={this.state.destinationDid}
              sx={{ width: 260 }}
              onChange={(e, i) => {
                this.setState({
                  destinationS: i
                })
              }}
              renderInput={(params) => <TextField {...params} label="Nơi đến" />}
            />
            <Divider />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Chọn ngày đi"
                value={this.state.depart_dateS}
                onChange={(newValue, e) => {
                  this.setState({
                    depart_dateS: newValue.format("YYYY-MM-DD"),
                  })
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Paper>

          <Button
            // href="/ticketpage"
            type="button"
            variant="contained"
            sx={{ width: 150, backgroundColor: "#f0d455" }}
            onClick={(e) => this.handleSearch()}
          >
            Tìm chuyến
          </Button>
        </Stack>
      </Paper>
    )
  }
}