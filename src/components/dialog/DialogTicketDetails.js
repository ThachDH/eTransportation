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
    Tab
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';

import Snackbar from '@mui/material/Snackbar';
import FlagIcon from '@mui/icons-material/Flag';
import CenteredTabs from "./CenteredTabs";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class DialogTicketDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

    render() {

        return (
            <>
                <Dialog alog open={this.props.dialog.isOpen} scroll="paper">
                    <DialogTitle variant="h5">Thông tin chi tiết</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <Card sx={{ width: '500px', height: '400px' }}>
                            {/* <Tabs value={value} onChange={handleChange} centered>
                                <Tab label="Item One" />
                                <Tab label="Item Two" />
                                <Tab label="Item Three" />
                            </Tabs> */}
                            <CenteredTabs />
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

