import * as React from "react";
import * as moment from "moment";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Stack,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Autocomplete,
  Checkbox
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import '../../styles/custom.scss'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import AddCompany from "../../components/dialog/AddCompany";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CheckBox } from "@mui/icons-material";
import Brightness1Icon from '@mui/icons-material/Brightness1';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { DataGrid } from '@mui/x-data-grid';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



class UserManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTable: [],
      // -------- filter state-----------
      fromDate: moment().subtract(1, "days"),
      toDate: moment(),
      // --------- alert state -------
      alert: {
        isOpen: false,
        message: 'Lỗi không xác định!',
        duration: 5000,
        type: 'info' // info / warning / error / success
      },
    }

    this.columns = [

      {
        field: "stt",
        headerName: "STT",
        editable: false,
        align: "center",
        headerAlign: "center",
        width: 100,
      },
      {
        field: "email",
        headerName: "Email",
        editable: false,
        align: "center",
        headerAlign: "center",
        width: 320,
      },
      {
        field: "name",
        headerName: "Tên người dùng",
        editable: false,
        align: "center",
        headerAlign: "center",
        width: 320,
      },
      {
        field: "phone_number",
        headerName: "Số điện thoại",
        editable: false,
        align: "center",
        headerAlign: "center",
        width: 320,
      },
      {
        field: "Action",
        headerName: "Đang hoạt động/Bị cấm",
        type: "actions",
        width: 320,
        getActions: (params) => {
          return [
            <Checkbox
              onChange={(e) => { this.handleBanUser(params.row.email) ; this.handleChangeStatus(params.row.stt - 1,e.target.checked, params.row); }}
              checked={
                params.row.status
              }
            ></Checkbox>
          ];
        }
      },
    ]

    this.createRows = (data) => data.map((row, index) => ({
      id: index + 1,
      stt: index + 1,
      ...row
    }),
    );
  }
  componentDidMount() {
    this.loadItem()
  }

  handleChangeStatus(idx,status, row) {
    const { dataTable } = this.state;
    let updateData = dataTable;
    updateData[idx]['status'] = status;
    this.setState({
      dataTable: updateData
    })
  }

  handleBanUser(params) {
    let url = `http://localhost:8080/api/admin/banUserByEmail`;
    let dataSend = {
      email: params
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
      .then((data) => {
        if(data.data) {
          this.setState({
            alert: {
              isOpen: true,
              duration: 2000,
              message: 'Chỉnh sửa trạng thái thành công!',
              type: 'success',
            },
          })
        }
      })
      .catch((err) => {
        console.log(err)
        return err;
      })
  }

  loadItem() {
    let url = `http://localhost:8080/api/admin/getAllUser`;
    let dataSend = {
      fromDate: this.state.fromDate,
      toDate: this.state.toDate
    }
    fetch(url, {
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new `Error`(text);
        }
        return res.json();
      })
      .then((data) => {
        if (data.result.length > 0) {
          let temp = this.createRows(data.result);
          this.setState({
            dataTable: temp,
            alert: {
              isOpen: true,
              duration: 2000,
              message: 'Nạp dữ liệu thành công!',
              type: 'success',
            },
          });
        } else {
          this.setState({
            alert: {
              isOpen: true,
              duration: 3000,
              message: 'Không tìm thấy dữ liệu',
              type: 'warning',
            },
          })
        }
      })
      .catch((err) => {
        console.log(err)
        return err;
      })
  }

  render() {
    return (
      <Box>
        <Card style={{ marginBottom: '12px' }}>
          <CardContent>
            <Grid container>
              <Grid item xs={4}>
                <Divider textAlign="left">
                  <span className="m-filter-title">Lọc dữ liệu</span>
                </Divider>
              </Grid>
            </Grid>
            <Stack component="form" direction="row" spacing={2} sx={{ mt: 1 }}>
              <Stack direction="row" spacing={1}>
                <FormControl>
                  <TextField
                    id="form-ma-sp"
                    label="Tên người dùng"
                    onChange={(event) => {

                    }} />
                </FormControl>
                <Divider orientation="vertical" />
                <LocalizationProvider dateAdapter={AdapterDayjs}  >
                  <DatePicker
                    label="Từ ngày"
                    value={this.state.fromDate}
                    onChange={(newValue) => {
                      this.setState({
                        fromDate: newValue
                      })
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}  >
                  <DatePicker
                    label="Đến ngày"
                    value={this.state.toDate}
                    onChange={(newValue) => {
                      this.setState({
                        toDate: newValue
                      })
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <Divider orientation="vertical" />
              </Stack>
              <Button type="button" variant="contained"
                onClick={() => this.loadItem()}>
                Tìm kiếm
              </Button>
            </Stack>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div style={{ height: 500, width: '100%' }}>
              <DataGrid
                className="m-table"
                hideFooterSelectedRowCount={true}
                rows={this.state.dataTable}
                columns={this.columns}
              >
              </DataGrid>
            </div>
          </CardContent>
        </Card>
        <Snackbar
          open={this.state.alert.isOpen}
          autoHideDuration={this.state.alert.duration}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          onClose={() => {
            this.setState({ alert: { ...this.state.alert, isOpen: false } })
          }}
        >
          <Alert
            severity={this.state.alert.type}
            sx={{ width: '100%' }}
          >
            {this.state.alert.message}
          </Alert>
        </Snackbar>
      </Box>
    )
  }
}
export default UserManage

