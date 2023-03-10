import * as React from "react";
import * as moment from "moment";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputAdornment,
  Stack,
  TextField,
  Divider,
  Autocomplete,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class AddCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: '',
        password: '',
        name: '',
        hotline: '',
        address: '',
        status: ''
      },
      // --------- alert state -------
      alert: {
        isOpen: false,
        message: 'Lỗi không xác định!',
        duration: 5000,
        type: 'info' // info / warning / error / success
      },
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.dialog.data !== null &&
      prevState.data.id !== nextProps.dialog.data.id
    ) {
      return { data: nextProps.dialog.data };
    } else return null;
  }
  closeDialog(dataSend) {
    this.props.handleCloseDialog(dataSend)
    this.setState({
      data: []
    })
  }
  handleInsert() {
    let url = `http://localhost:8080/api/admin/createCompany`;
    let dataSend = {
      email: this.state.data.email,
      password: this.state.data.password,
      name: this.state.data.name,
      hotline: this.state.data.hotline,
      address: this.state.data.address,
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
        this.setState({
          alert: {
            isOpen: true,
            message: 'Thêm mới thành công',
            duration: 5000,
            type: 'success' // info / warning / error / success
          }
        })
        this.props.handleCreate(dataSend);
      })
      .catch((err) => {
        this.setState({
          alert: {
            isOpen: true,
            message: 'Thêm mới thất bại, trùng email',
            duration: 5000,
            type: 'error' // info / warning / error / success
          }
        })
      })
  }
  handleUpdate() {
    let url = `http://localhost:8080/api/admin/updateCompany`;
    let dataSend = {
      email: this.state.data.email,
      name: this.state.data.name,
      hotline: this.state.data.hotline,
      address: this.state.data.address,
      status: this.state.data.status === 'Hoạt động' ? 1 : 0,
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
        this.setState({
          alert: {
            isOpen: true,
            message: 'Chỉnh sửa thành công',
            duration: 5000,
            type: 'success' // info / warning / error / success
          }
        })
      })
      .catch((err) => {
        this.setState({
          alert: {
            isOpen: true,
            message: 'Chỉnh sửa thất bại',
            duration: 5000,
            type: 'error' // info / warning / error / success
          }
        })
      })
  }

  render() {
    return (
      <Dialog open={this.props.dialog.isOpen} scroll="paper" >
        <DialogTitle variant="h5">
          {this.props.dialog.type === 0
            ? "Thêm Công Ty"
            : "Chỉnh Sửa Thông Tin"}
        </DialogTitle>
        <DialogContent>
          <Box>
            <Card style={{ marginBottom: '12px' }} >
              <CardContent>
                <Stack spacing={2}>
                  <Stack direction='row' spacing={1}>
                    <FormControl
                      fullWidth>
                      {this.props.dialog.type === 0 ? <TextField
                        label="Email"
                        value={this.state.data.email}
                        onChange={(e) => {
                          this.setState({
                            data: {
                              ...this.state.data,
                              email: e.target.value
                            }
                          })
                        }}
                      /> : <TextField
                        label="Email"
                        disabled
                        value={this.state.data.email}
                        onChange={(e) => {
                          this.setState({
                            data: {
                              ...this.state.data,
                              email: e.target.value
                            }
                          })
                        }}
                      />}
                    </FormControl>
                    <FormControl
                      fullWidth>
                      <TextField
                        label="Tên Công Ty"
                        value={this.state.data.name}
                        onChange={(e) => {
                          this.setState({
                            data: {
                              ...this.state.data,
                              name: e.target.value
                            }
                          })
                        }}
                      />
                    </FormControl>

                  </Stack>
                  <Stack direction='row' spacing={1}>
                    <FormControl
                      fullWidth>
                      <TextField
                        label="Password"
                        value={this.state.data.password}
                        onChange={(e) => {
                          this.setState({
                            data: {
                              ...this.state.data,
                              password: e.target.value
                            }
                          })
                        }}
                      />
                    </FormControl>
                    <FormControl
                      fullWidth>
                      <TextField
                        label="Hotline"
                        value={this.state.data.hotline}
                        onChange={(e) => {
                          this.setState({
                            data: {
                              ...this.state.data,
                              hotline: e.target.value
                            }
                          })
                        }}
                      />
                    </FormControl>
                  </Stack>
                  <Stack direction='row' spacing={1}>
                    <FormControl fullWidth>
                      {this.props.dialog.type === 0 ? <Autocomplete
                        defaultValue={'Hoạt động'}
                        options={['Hoạt động', 'Ngừng hoạt động']}
                        renderInput={(params) => <TextField {...params} label="Trạng thái" />}
                      /> : <Autocomplete
                        options={['Hoạt động', 'Ngừng hoạt động']}
                        onChange={(event, data) => {
                          console.log(data)
                          this.setState({
                            data: {
                              ...this.state.data,
                              status: data,
                            },
                          })
                        }}
                        renderInput={(params) => <TextField {...params} label="Trạng thái" />}
                      />}

                    </FormControl>
                    <FormControl
                      fullWidth>
                      <TextField
                        label="Address"
                        value={this.state.data.address}
                        onChange={(e) => {
                          this.setState({
                            data: {
                              ...this.state.data,
                              address: e.target.value
                            }
                          })
                        }}
                      />
                    </FormControl>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Box>
          <Stack direction='row' spacing={1} justifyContent="flex-end">
            {this.props.dialog.type === 0 ? <Button variant="contained" onClick={() => this.handleInsert()}>Lưu</Button> :
              <Button variant="contained" onClick={() => this.handleUpdate()}>Chỉnh sửa</Button>
            }

            <Button variant="contained" onClick={() => this.closeDialog()}>Đóng</Button>
          </Stack>
          <Snackbar
            open={this.state.alert.isOpen}
            autoHideDuration={this.state.alert.duration}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
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
        </DialogContent>
      </Dialog>

    );
  }
}
export default AddCompany;