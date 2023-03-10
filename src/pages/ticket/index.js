import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import React from 'react'
import Footer from '../../components/footer/Footer'
import Navigation from '../../components/navigation/Nav'
import SearchBar from '../../components/searchRoute/SearchBar'
import Ticketdetails2 from './TicketDetails2';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Container } from 'react-bootstrap';
import Slider from '@mui/material/Slider';

//begin - slider gia ve
const followersMarks = [
    {
        value: 0,
        scaledValue: 0,
        label: "0"
    },
    {
        value: 25,
        scaledValue: 150000
    },
    {
        value: 50,
        scaledValue: 250000
    },
    {
        value: 75,
        scaledValue: 375000
    },
    {
        value: 100,
        scaledValue: 500000,
        label: "500k"
    },
    {
        value: 125,
        scaledValue: 625000
    },
    {
        value: 150,
        scaledValue: 750000
    },
    {
        value: 175,
        scaledValue: 875000
    },
    {
        value: 200,
        scaledValue: 1000000,
        label: "1M"
    }
];
const scale = value => {
    const previousMarkIndex = Math.floor(value / 25);
    const previousMark = followersMarks[previousMarkIndex];
    const remainder = value % 25;
    if (remainder === 0) {
        return previousMark.scaledValue;
    }
    const nextMark = followersMarks[previousMarkIndex + 1];
    const increment = (nextMark.scaledValue - previousMark.scaledValue) / 25;
    return remainder * increment + previousMark.scaledValue;
};

function numFormatter(num) {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(0) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(0) + "M"; // convert to M for number from > 1 million
    } else if (num < 900) {
        return num; // if value < 1000, nothing to do
    }
}
// end - slider gia ve

export default function TicketPage() {
    const [value, setValue] = React.useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Navigation />
            <div className="home-header-img">
                <div className="home-header-search-bar">
                    <SearchBar />
                </div>
            </div>

            <Container>

                {/* bo loc */}
                <div>B??? l???c</div>


                <Grid container spacing={4}>
                    <Grid item xs={2.5}  >
                        <Grid className='boloc' >
                            {/*radio loai xe */}
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Lo???i xe</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="Xe 16 ch???" control={<Radio />} label="Xe 16 ch??? ng???i" />
                                    <FormControlLabel value="Xe 26 ch???" control={<Radio />} label="Xe 26 ch??? ng???i" />
                                    <FormControlLabel value="Xe 36 ch???" control={<Radio />} label="Xe 36 ch??? ng???i" />
                                    <FormControlLabel value="Xe 46 ch???" control={<Radio />} label="Xe 46 ch??? ng???i" />
                                </RadioGroup>
                            </FormControl>

                            {/*slider gia ve */}
                            <Box width={'90%'} mt={3} mb={3}>
                                <FormLabel>Gi?? v??: t??? 0 - {scale(value) == '6000' ? '1000000' : scale(value)}??</FormLabel>
                                <Slider
                                    defaultValue={200}
                                    min={0}
                                    step={25}
                                    max={200}
                                    valueLabelFormat={numFormatter}
                                    marks={followersMarks}
                                    scale={scale}
                                    onChange={handleChange}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="non-linear-slider"
                                />
                            </Box>

                            {/*check box nha xe */}
                            <FormGroup >
                                <FormLabel>Nh?? xe</FormLabel>
                                <FormControlLabel control={<Checkbox />} label="Ph????ng Trang" />
                                <FormControlLabel control={<Checkbox />} label="Limosin" />
                            </FormGroup>

                        </Grid>


                    </Grid>

                    {/* Ticket detail */}
                    <Grid item xs={9.5} >
                        <Ticketdetails2 />
                    </Grid>

                </Grid>

            </Container>

            <Footer />
        </>
    )
}
