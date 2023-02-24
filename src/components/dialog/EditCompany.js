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

class EditCompany extends React.Component {
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
      }
    }
  }
  handleUpdate() {
    let url = `http://localhost:8080/api/admin/updateCompany`;
    let dataSend = {
      email: this.state.data.email,
      name: this.state.data.name,
      hotline: this.state.data.hotline,
      address: this.state.data.address,
      status : this.state.data.status
    }
    console.log(dataSend)

  }
  closeDialog(dataSend) {
    this.props.handleCloseDialog(dataSend)
  }
  render() {
    if (this.props.dialogEdit.data !== null) {
      return (
        <>
          <Dialog open={this.props.dialogEdit.isOpen} scroll="paper" >
            <DialogTitle variant="h5">
              Chỉnh Sửa Công Ty
            </DialogTitle>
            <DialogContent>
              <Box>
                <Card style={{ marginBottom: '12px' }} >
                  <CardContent>
                    <Stack spacing={2}>
                      <Stack direction='row' spacing={1}>
                        <FormControl
                          fullWidth>
                          <TextField
                            label="Email"
                            disabled
                            value={this.props.dialogEdit.data.email}
                            onChange={(e) => {
                              this.setState({
                                data: {
                                  ...this.state.data,
                                  email: e.target.value
                                }
                              })
                            }}
                          />
                        </FormControl>
                        <FormControl
                          fullWidth>
                          <TextField
                            label="Tên Công Ty"
                            value={this.props.dialogEdit.data.name}
                            onChange={(e) => {
                              console.log(e)
                              console.log(e.target.value)
                              this.setState({
                                data: {
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
                            label="Hotline"
                            value={this.props.dialogEdit.data.hotline}
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
                        <FormControl fullWidth>
                          <Autocomplete
                            options={['Ban', 'Unban']}
                            renderInput={(params) => <TextField {...params} label="Trạng thái" />}
                          />
                        </FormControl>
                      </Stack>
                      <FormControl
                        fullWidth>
                        <TextField
                          label="Address"
                          value={this.props.dialogEdit.data.address}
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
                  </CardContent>
                </Card>
              </Box>
              <Stack direction='row' spacing={1} justifyContent="flex-end">
                <Button variant="contained" onClick={() => this.handleUpdate()}>Lưu</Button>
                <Button variant="contained" onClick={() => this.closeDialog()}>Đóng</Button>
              </Stack>
            </DialogContent>

          </Dialog >
        </>
      );
    }

  }
}
export default EditCompany;