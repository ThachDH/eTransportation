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

import Picktime from './Picktime';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Paper
        elevation={6}
        sx={{ backgroundColor: '#e9edf1', marginTop: "5px", marginLeft: "50vh", marginBottom: "5px", width: "850px", height: "130px", borderRadius: "10px", position: "relative" }}
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
              options={["BRVT", "Long An", "TP.HCM", "Cần Thơ"]}
              sx={{ width: 260 }}
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
              options={["Hà Nội", "Yên Bái", "Hưng Yên", "Vĩnh Phúc", "Gia Lai", "Thái Bình"]}
              sx={{ width: 260 }}
              renderInput={(params) => <TextField {...params} label="Nơi đến" />}
            />
            <Divider />
            {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
              <CalendarMonthOutlinedIcon />
            </IconButton>
            <InputBase
              placeholder="Nhập ngày đi"
            //  inputProps={{ 'aria-label': 'Nhap ngay di' }}
            /> */}
            <Picktime ></Picktime>
          </Paper>

          <Button
            href="/ticketpage"
            type="button"
            variant="contained"
            sx={{ width: 150, backgroundColor: "#f0d455" }}
          >
            Tìm chuyến
          </Button>
        </Stack>
      </Paper>
    )
  }
}