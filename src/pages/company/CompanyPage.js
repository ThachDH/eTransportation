import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MuiAlert from '@mui/material/Alert';



import PeopleIcon from '@mui/icons-material/People';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LogoutIcon from '@mui/icons-material/Logout';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import '../../styles/custom.scss'
import Login from '../login';
import { Snackbar, Tooltip } from '@mui/material';
import ErrorPage from '../errorpage/ErrorPage';

import AddRoute from './AddRoute';
import AddTicket from './AddTicket';
import AddTrip from './AddTrip';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import ExploreIcon from '@mui/icons-material/Explore';
import Chart from './Chart';
//Begin-AppBar
const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);
const mdTheme = createTheme();
//End-AppBar

//Begin-Tab
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
//End-Tab


export function CompanyPage() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    //AppBar
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    //AppBar

    //check truoc khi vao admin page da login chua
    if (localStorage.getItem('role') !== 'COMPANY' || localStorage.getItem('role' === null)) {
        return (window.location.href = `/error-page/${2}`)
    }
    //logout
    const handleLogout = () => {
        localStorage.clear();
    }
    return (
        <>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="absolute" open={open}>
                        <Toolbar
                            sx={{
                                bgcolor: '#2c5b90',
                                pr: '24px', // keep right padding when drawer closed
                            }}
                        >
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{ marginRight: '36px', ...(open && { display: 'none' }), }} >
                                <MenuIcon />
                            </IconButton>

                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1 }}>
                                Xin Chào nhà xe {localStorage.getItem('user_name')}
                            </Typography>

                            <Tooltip title='Đăng xuất'>
                                <IconButton color="inherit" href="/home" onClick={handleLogout} >
                                    <LogoutIcon />
                                </IconButton>
                            </Tooltip>



                        </Toolbar>
                    </AppBar>

                    <Drawer variant="permanent" open={open}>
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                px: [1],
                            }}>
                            <IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Toolbar>

                        <Divider />
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider' }}  >
                            <Tab sx={{ justifyContent: 'flex-start' }} icon={<EditLocationAltIcon fontSize='large' />} iconPosition="start" label="Quản lý địa điểm"{...a11yProps(0)} />
                            <Tab sx={{ justifyContent: 'flex-start' }} icon={<ExploreIcon fontSize='large' />} iconPosition="start" label="Quản lý tuyến"{...a11yProps(1)} />
                            <Tab sx={{ justifyContent: 'flex-start' }} icon={<DepartureBoardIcon fontSize='large' />} iconPosition="start" label="Quản lý chuyến xe"{...a11yProps(2)} />
                        </Tabs>
                    </Drawer>
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar />
                        <div maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            <TabPanel value={value} index={0}>
                                <AddRoute></AddRoute>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                {/* <AddTicket></AddTicket> */}
                                <Chart></Chart>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <AddTrip></AddTrip>
                            </TabPanel>
                        </div>
                    </Box>
                </Box>

            </ThemeProvider>


        </>

    );
}

