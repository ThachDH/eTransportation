import {
    Box,
    Tabs,
    Tab,
    AppBar,
    Typography,
  } from "@mui/material";
  import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
  import PropTypes from 'prop-types';
  import * as React from "react";
  import { AppRegistration, Inventory, LocalLaundryService, LocationCity, MiscellaneousServices } from "@mui/icons-material";
  import UserManage from "./UserManage";
  import ComanyManage from "./ComanyManage";

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
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
  
  export class Generals extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedTab: 0
      }
    }
  
    tabSelectHandler(e, value) {
      this.setState({ selectedTab: value })
    }
    //----------------------------
    render() {
      return (
        <Box>
        <h2 style={{ textAlign: 'center', color: 'red' }}>Quản lý người dùng</h2>
          <Box sx={{ width: '100%' }}>
            <AppBar position="static">
              <Tabs
                value={this.state.selectedTab}
                onChange={this.tabSelectHandler.bind(this)}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Công ty đăng kí" icon={<Inventory />} iconPosition="start" />
                <Tab label="Người dùng đăng kí" icon={<Inventory />} iconPosition="start" />
              </Tabs>
            </AppBar>
            <Box sx={{ bgcolor: 'background.paper' }}>
              <TabPanel value={this.state.selectedTab} key={0} index={0}>
                <ComanyManage/>
              </TabPanel>
              <TabPanel value={this.state.selectedTab} key={1} index={1}>
                <UserManage></UserManage>
              </TabPanel>
            </Box>
          </Box>
        </Box >
      );
    }
  }