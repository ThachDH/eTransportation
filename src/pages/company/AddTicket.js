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

class AddTicket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTable: [],
      data: {
        STT: "",
        transportation_name: "",
      },
      tableFilter: {
        transportation_name: ''
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
        field: "transportation_name",
        headerName: 'Tên công ty',
        flex: 1,
        editable: true,
        headerAlign: "center"

      },
      {
        field: "type",
        headerName: 'Loại xe',
        flex: 1,
        editable: true,
        headerAlign: "center"

      },
      {
        field: "route_name",
        headerName: 'Tuyến đường',
        flex: 1,
        editable: true,
        headerAlign: "center"
      },
      {
        field: "time",
        headerName: 'Thời gian đến',
        flex: 1,
        editable: true,
        headerAlign: "center"
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

  }

  handleViewData() {
    //API view Route
  }
  handleDelete() {
    //API Delete Route
  }

  handleSave() {
    //API luu
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
                    <Button
                      style={{ marginLeft: "20px" }}
                      type="button"
                      variant="outlined"
                      onClick={() => this.handleDelete()}
                      startIcon={<DeleteIcon />}
                      color="error"
                    >
                      Xóa dòng
                    </Button>
                  </Stack>
                </Stack>
                <Divider />
                <Grid item mt={1} md={12}>
                <DataGrid
                    className="m-table"
                    rows={(this.state.dataTable)
                      .filter(data => data.transportation_name.toUpperCase().includes(this.state.tableFilter.transportation_name.toUpperCase()))
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
export default AddTicket;