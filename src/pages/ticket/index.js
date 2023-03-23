import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Footer from '../../components/footer/Footer'
import Navigation from '../../components/navigation/Nav'
import SearchBar from '../../components/searchRoute/SearchBar'
import Ticketdetails2 from './TicketDetails2';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Container } from 'react-bootstrap';
import Slider from '@mui/material/Slider';
import React, { useEffect } from 'react'
import moment from 'moment';

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

    const [arrayTicket, setArrayTicket] = React.useState([]);
    const actionSearch = (arrTicketSearch) => {
        setArrayTicket(arrTicketSearch)
    }
    const [type, setType] = React.useState('')
    const [arrTicketByType, setArrTicketByType] = React.useState([])

    useEffect(() => {

            let url = `http://localhost:8080/api/getAllTripByType`;
            let dataSend = {
                type: type
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
                    if (data.data) {
                         data.result.map(e => {
                            e.begin_time = moment(e.begin_time).format('DD/MM HH:mm:ss')
                            e.end_time = moment(e.end_time).format('DD/MM HH:mm:ss')
                        })
                        setArrTicketByType(data.result)
                    } else {
                        setArrTicketByType([])
                    }
                })
    }, [type])

    return (
        <>
            <Navigation />
            <div className="home-header-img">
                <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', top: '40%' }}>
                    <SearchBar
                        handleChange={(arrTicketSearch) => actionSearch(arrTicketSearch)}
                    />
                </div>
            </div>
            <Container>
                {/* bo loc */}
                <div>Bộ lọc</div>
                <Grid container spacing={4} sx={{mb: 3}}>
                    <Grid item xs={2.5}  >
                        <Grid className='boloc' >
                            {/*radio loai xe */}
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Loại xe</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="Xe 0 chỗ" control={<Radio
                                        onClick={() => setType(0)}
                                    />} label="Tất cả loại xe" />
                                    <FormControlLabel value="Xe 7 chỗ" control={<Radio
                                        onClick={() => setType(7)}
                                    />} label="Xe 7 chỗ ngồi" />
                                    <FormControlLabel
                                        value="Xe 16 chỗ"
                                        control={<Radio
                                            onClick={() => setType(16)}
                                        />} label="Xe 16 chỗ ngồi" />
                                    <FormControlLabel
                                        value="Xe 30 chỗ"
                                        control={<Radio
                                            onClick={() => setType(30)}
                                        />} label="Xe 30 chỗ ngồi" />
                                    <FormControlLabel
                                        value="Xe 45 chỗ"
                                        control={<Radio
                                            onClick={() => setType(45)}
                                        />} label="Xe 45 chỗ ngồi" />
                                </RadioGroup>
                            </FormControl>

                            {/*slider gia ve */}
                            
                        </Grid>
                    </Grid>
                    {/* Ticket detail */}
                    <Grid item xs={9.5} >
                        <Ticketdetails2
                            arrayTicket={arrayTicket}
                            arrTicketByType={arrTicketByType}
                        />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    )
}
