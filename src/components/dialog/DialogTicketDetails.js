import * as React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Radio,
  Card,
  CardContent,
  FormControl,
  Box,
  Tabs,
  Tab,
  Typography
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import PropTypes from 'prop-types';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

class DialogTicketDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      isOpen: false,
      // --------- alert state -------
      alert: {
        isOpen: false,
        message: 'Lỗi không xác định!',
        duration: 5000,
        type: 'info' // info / warning / error / success
      },
    }

  }
  closeDialog(dataSend) {
    this.props.handleCloseDialog(dataSend);
  }
  tabSelectHandler(e, value) {
    this.setState({ selectedTab: value })
  }
  render() {
    return (
      <>
        <Dialog alog open={this.props.dialog.isOpen} scroll="paper">
          <DialogTitle variant="h5">Thông tin chi tiết</DialogTitle>
          <Divider />
          <DialogContent>
            <Card sx={{ width: '500px', height: '400px' }}>
              <CardContent>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                value={this.state.selectedTab}
                onChange={this.tabSelectHandler.bind(this)}
                indicatorColor="secondary"
                textColor="inherit"
                // variant="fullWidth"
                aria-label="full width tabs example"
              >
                      <Tab label="Hình ảnh"  />
                      <Tab label="Tiện ích"  />
                      <Tab label="Điểm đón, trả"  />
                    </Tabs>
                  </Box>
                  <TabPanel value={this.state.selectedTab} index={0} >
                    x
                  </TabPanel>
                  <TabPanel value={this.state.selectedTab} index={1}>
                    text
                  </TabPanel>
                  <TabPanel value={this.state.selectedTab} index={2}>
                    text
                  </TabPanel>
                </Box>
              </CardContent>
            </Card>
          </DialogContent>
          <Button
            onClick={() => this.closeDialog()}
            variant="contained">
            Đóng
          </Button>
        </Dialog>
      </>

    );
  }
}
export default DialogTicketDetails;

