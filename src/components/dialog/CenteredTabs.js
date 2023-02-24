import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
    MDBCarousel,
    MDBCarouselItem,
} from 'mdb-react-ui-kit';

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

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Hình ảnh" {...a11yProps(0)} />
                    <Tab label="Tiện ích" {...a11yProps(1)} />
                    <Tab label="Điểm đón, trả" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0} >
                <MDBCarousel showControls fade >
                    <MDBCarouselItem
                        className='w-100 d-blok'
                        itemId={1}
                        src='//static.vexere.com/production/images/1559637550202.jpeg'
                        alt='...'
                        height='300px'
                    />
                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={2}
                        src='////static.vexere.com/c/i/12766/xe-hai-au-VeXeRe-dWNz2xW-1000x600.jpeg'
                        alt='...'
                        height='300px'

                    />
                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={3}
                        src='//static.vexere.com/production/images/1660614512334.jpeg'
                        alt='...'
                        height='300px'

                    />
                </MDBCarousel>
            </TabPanel>
            <TabPanel value={value} index={1}>
                text
            </TabPanel>
            <TabPanel value={value} index={2}>
                text
            </TabPanel>
        </Box>
    );
}