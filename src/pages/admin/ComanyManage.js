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
  Autocomplete
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import AddCompany from "../../components/dialog/AddCompany";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CheckBox } from "@mui/icons-material";
import Brightness1Icon from '@mui/icons-material/Brightness1';
import DangerousIcon from '@mui/icons-material/Dangerous';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const columns = [
  { id: "name", label: "Tên Công Ty", minWidth: 70, align: "center" },
  { id: "email", label: "Email", minWidth: 70 },
  { id: "address", label: "Địa chỉ", minWidth: 120 },
  { id: "hotline", label: "Số điện thoại", minWidth: 120 },
  { id: "status", label: "Trạng thái", minWidth: 120 },
];

class ComanyManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      dataTable: [],
      dialog: {
        isOpen: false,
        data: null,
        type: 0,
      },

      closePopup: {
        isOpen: false,
      },
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
  }
  handleChangePage(event, newPage) {
    this.setState({ page: newPage });
  }

  handleChangeRowsPerPage(event) {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  }
  them() {
    this.setState({
      dialog: {
        isOpen: true,
        data: null,
        type: 0,
      },
    });
  }

  sua(row, index) {
    console.log(row)
    this.setState({
      dialog: {
        isOpen: true,
        data: { ...row, id: index },
        type: 1,
      },
    });
  }
  closeDialog(dataSend) {
    console.log(dataSend)
    this.setState({
      dialog: {
        isOpen: false,
        data: null,
        type: 0,
      },
    });
  }

  componentDidMount() {
    this.loadItem()
  }

  handleCreateSuccess(data) {
    let tempData = this.state.dataTable;
    let tempObj = {};

    Object.keys(data).map(key => {
      return tempObj[key] = data[key];
    });
    tempObj.status = 1

    tempData.push(tempObj);
    this.setState({
      dataTable: tempData
    });
  }

  loadItem() {
    let url = `http://localhost:8080/api/admin/getAllCompany`;
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
          this.setState({
            dataTable: data.result,
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
      <>
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
                    label="Email"
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
            <Stack direction="column" spacing={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                <div>
                  <Grid item xs={6}>
                    <Divider textAlign="left">
                    </Divider>
                  </Grid>
                  <Stack component="form" direction="row" spacing={1}>

                  </Stack>
                </div>
                <Stack direction="row" spacing={1}>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => this.them()}
                  >
                    Thêm Công ty
                  </Button>
                </Stack>
              </Stack>
              <Divider />
              <TableContainer>
                <Table aria-label="table">
                  <TableHead sx={{ bgcolor: '#00FFFF' }}>
                    <TableRow key={'header-0'}>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                      <TableCell
                        align="right"
                        style={{ minWidth: "116px", width: "116px" }}
                        className="sticky-column"
                      ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.dataTable
                      .slice(
                        this.state.page * this.state.rowsPerPage,
                        this.state.page * this.state.rowsPerPage +
                        this.state.rowsPerPage
                      )
                      .map((row, index) => {
                        return (
                          <TableRow
                            hover
                            key={row.name}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              if (column.id !== 'status') {
                                return (
                                  <TableCell key={column.id} align={column.align}>
                                    {value}
                                  </TableCell>
                                );
                              } else {
                                return (<TableCell key={column.id} align={column.align}>
                                  <FormControl
                                    fullWidth>
                                    {value === 1 ? (
                                      <div>
                                        <span>Đang hoạt động</span>
                                        <Brightness1Icon sx={{ color: 'green' }} />
                                      </div>
                                    ) : <div>
                                      <span>Bị Cấm</span>
                                      <DangerousIcon sx={{ color: 'red' }} />
                                    </div>
                                    }

                                  </FormControl>
                                </TableCell>)
                              }
                            })}
                            <TableCell align="right" className="sticky-column">
                              <Stack direction="row" spacing={1}>
                                <Tooltip title="Chỉnh Sửa">
                                  <IconButton
                                    variant="sua"
                                    onClick={() => this.sua(row, index)}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={(this.state.dataTable || []).length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onPageChange={(event, newPage) =>
                  this.handleChangePage(event, newPage)
                }
                onRowsPerPageChange={(event) =>
                  this.handleChangeRowsPerPage(event)
                }
              />
            </Stack>
          </CardContent>
        </Card>
        <AddCompany
          dialog={this.state.dialog}
          handleCloseDialog={(dataSend) => this.closeDialog(dataSend)}
          handleCreate={(data) => this.handleCreateSuccess(data)}
        />
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
      </>
    );
  }

}
export default ComanyManage;