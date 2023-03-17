import * as React from "react";
import * as moment from "moment";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import InputAdornment from '@mui/material/InputAdornment';
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Button,
  Stack,
  Checkbox,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import AddRows from "../../components/dialog/AddRows";
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class AddTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departDid: [],
      destinationDid: [],


      dataTable: [],
      data: {
        STT: "",
        route_name: "",
        price: "",
      },
      tableFilter: {
        route_name: ''
      },

      dialog: {
        isOpen: false,
        data: null,
        type: 0,
      },
      dialogAlert: {
        isOpen: false,
        data: null,
        type: 0,
      },
      // --------- alert state -------
      alert: {
        isOpen: false,
        message: 'Lỗi không xác định!',
        duration: 5000,
        type: 'info' // info / warning / error / success
      },
    };
    this.columns = [
      {
        field: "STT",
        headerName: "STT",
        width: 100,
        headerAlign: "center"

      },
      {
        field: "depart",
        headerName: 'Điểm đi',
        flex: 1,
        editable: true,
        headerAlign: "center",
        type: 'singleSelect',
        valueOptions: () => {
          const options = this.state.departDid;
          return options;
        }
      },
      {
        field: "destination",
        headerName: 'Điểm đến',
        flex: 1,
        editable: true,
        headerAlign: "center",
        type: 'singleSelect',
        valueOptions: () => {
          const options = this.state.destinationDid;

          return options;
        }
      },
      {
        field: "distance",
        headerName: 'Khoảng cách',
        flex: 1,
        editable: true,
        headerAlign: "center",
        type: 'number',
      },
      {
        field: "price",
        headerName: 'Giá',
        flex: 1,
        editable: true,
        headerAlign: "center",
        type: 'number',
      },
      {
        field: "begin_time",
        headerName: 'Thời gian đi',
        flex: 1,
        editable: true,
        headerAlign: "center",
        type: 'dateTime',
      },
      {
        field: "end_time",
        headerName: 'Thời gian đến',
        flex: 1,
        editable: true,
        headerAlign: "center",
        type: 'dateTime',
      },
      {
        field: "transport_name",
        headerName: 'Tên xe',
        flex: 1,
        editable: true,
        headerAlign: "center",
      },
      {
        field: "type",
        headerName: 'Loại xe',
        flex: 1,
        editable: true,
        headerAlign: "center",
        type: 'singleSelect',
        valueOptions: [{ value: '7', label: '7' }, { value: '16', label: '16' }, { value: '30', label: '30' }, { value: '45', label: '45' }],
      },
      {
        field: "image_path",
        headerName: 'Đường dẫn ảnh',
        flex: 1,
        editable: true,
        headerAlign: "center",
      },
    ]
    this.createRows = (data) => data.map((row, index) => ({
      STT: index + 1,
      id: index,
      ...row
    }),
    );
  }
  handleAddRow(rowCount) {
    let { dataTable } = this.state;
    let newRow = [];
    for (let i = 0; i < rowCount; i++) {
      let newData = {
        ...this.state.data,
        id: dataTable.length + i,
        STT: dataTable.length + i + 1,
        status: 'insert',
      }
      newRow.push(newData);
    }
    let mergeDataTable = [...dataTable, ...newRow];
    this.setState({
      dataTable: mergeDataTable,
      alert: {
        isOpen: true,
        type: "success",
        duration: 2000,
        message: "Thêm dòng thành công",
      }
    })
  }
  componentDidMount() {
    this.handleViewData();
    this.apiRoute();
  }

  handleViewData() {
    let url = `http://localhost:8080/api/company/getTripsByComId`;
    let dataSend = {
      company_id: Number(localStorage.getItem('id'))
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
        console.log(this.createRows(data.result))
        if (data.result.length > 0) {
          let temp = this.createRows(data.result);
          temp.map(e => {
            e.begin_time = moment(e.begin_time).format("DD-MM-YYYY HH:mm:ss")
            e.end_time = moment(e.end_time).format("DD-MM-YYYY HH:mm:ss")
          })
          this.setState({
            dataTable: temp,
            alert: {
              isOpen: true,
              type: "success",
              duration: 3000,
              message: "Nạp dữ liệu thành công!"
            },
          })
        }
        else {
          this.setState({
            dataTable: [],
            alert: {
              type: 'warning',
              message: 'Không tìm thấy dữ liệu!',
              duration: 3000,
              isOpen: true
            }
          });
        }
      })
  }


  handleSave() {
    let url = `http://localhost:8080/api/company/createUpdateTripByCompany`;

    let checkColumn = {
      depart: "Điểm đi",
      destination: "Điểm đến",
      distance: "Khoảng cách",
      price: "Giá xe",
      begin_time: "Thời gian đi",
      end_time: "Thời gian đến",
      type: "Loại xe",
      image_path: "Ảnh xe"


    }
    let arr = [];
    let dataSend = this.state.dataTable.filter(p => p.status === 'insert' || p.status === 'update').map(data => {
      if (arr.length === 0) {
        Object.keys(checkColumn).map((key) => {
          return !data[key] ? arr.push(checkColumn[key]) : [];
        });
      }
      return data;
    });
    if (arr.length > 0) {
      this.setState({
        alert: {
          isOpen: true,
          duration: 3000,
          message: arr.join(', ') + " không được để trống",
          type: "error"
        }
      })
      return;
    }
    dataSend.map(e => {
      return e['company_id'] = Number(localStorage.getItem('id'))
    })
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
        if (data.array_object[0].data) {
          this.setState({
            alert: {
              isOpen: true,
              type: "success",
              duration: 3000,
              message: "Lưu dữ liệu thành công!"
            },
          })
        }
      })
  }

  apiRoute() {
    //API view Route
    let url = `http://localhost:8080/api/company/getRoutesByComId`;
    let dataSend = {
      company_id: Number(localStorage.getItem('id'))
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
        if (data.result.length > 0) {
          let tempdepart = data.result.map(e => e.depart)
          let tempDetination = data.result.map(e => e.destination)
          this.setState({
            departDid: tempdepart,
            destinationDid: tempDetination
          })
        }
      })
  }

  filterGridView() {
    this.setState({ tableFilter: Object.assign({}, this.tableFilter) });
  }

  render() {
    return (
      <>
        <Card style={{ marginBottom: "12px" }}>
          <CardContent>
            <Grid container>
              <Grid item xs={12} spacing={2}>
                <Stack mb={1} direction="row" justifyContent="space-between">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <span>Tìm kiếm:</span>
                    <TextField
                      id="tim-kiem"
                      onChange={(e) => {
                        this.setState({
                          tableFilter: {
                            depart: e.target.value,
                          }
                        });
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchIcon
                              style={{ cursor: "default" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Divider orientation="vertical" />
                    <Button
                      className="m-btn m-secondary"
                      type="button"
                      variant="outlined"
                      onClick={() => {
                        this.setState({
                          dialog: {
                            isOpen: true,
                            data: null,
                            type: 0,
                          },
                        });
                      }}
                      startIcon={<AddIcon />}
                    >
                      Thêm dòng
                    </Button>
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() => this.handleSave()}
                      startIcon={<SaveIcon />}
                      color="success"
                    >
                      Lưu
                    </Button>

                    <Divider orientation="vertical" />
                  </Stack>
                </Stack>
                <Divider />
                <Grid item mt={1} md={12}>
                  <DataGrid
                    className="m-table"
                    rows={(this.state.dataTable)
                    }
                    rowHeight={35}
                    columns={this.columns}
                    sx={{ height: "63vh" }}
                    onCellEditCommit={(params) => {
                      let temp = [...this.state.dataTable];
                      temp.map(data => {
                        if (params.id === data.id) {
                          data[params.field] = params.value;
                          if (data.status !== 'insert') {
                            data.status = 'update'
                          }
                        }
                        return true;
                      });
                      this.setState({ dataTable: temp })
                    }}
                    checkboxSelection
                    disableSelectionOnClick
                    onSelectionModelChange={(ids) => {
                      let { dataTable } = this.state;
                      dataTable.map(item => item['isChecked'] = ids.indexOf(item.id) >= 0);
                      this.setState({
                        dataTable: dataTable
                      })
                    }}
                  >
                  </DataGrid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <AddRows
          dialog={this.state.dialog}
          handleCloseDialog={() => {
            this.setState({
              dialog: {
                isOpen: false,
                data: null,
                type: 0,
              },
            });
          }}
          handleAddRows={(rowCount) => this.handleAddRow(rowCount)}
        >
        </AddRows>
        {/* -------------------- global alert -------------------- */}
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
      </>
    );
  }
}
export default AddTrip;