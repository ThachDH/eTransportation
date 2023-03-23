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
export class UserAcoountManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTable: [],

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
        headerName: 'Điểm xuất phát',
        flex: 1,
        editable: false,
        headerAlign: "center",
      },
      {
        field: "destination",
        headerName: 'Điểm đến',
        flex: 1,
        editable: false,
        headerAlign: "center",
      },
      {
        field: "order_date",
        headerName: 'Ngày đặt vé',
        flex: 1,
        editable: false,
        headerAlign: "center",
      },
      {
        field: "begin_time",
        headerName: 'Thời gian xuất phát',
        flex: 1,
        editable: false,
        headerAlign: "center",
      },
      {
        field: "transport_name",
        headerName: 'Tên xe',
        flex: 1,
        editable: false,
        headerAlign: "center",
      },
      {
        field: "price",
        headerName: 'Giá',
        flex: 1,
        editable: false,
        headerAlign: "center",
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Hủy chuyến',
        width: 80,
        getActions: (params) => [

          <Button
            onClick={() => { this.handleDelete(params); console.log(params) }}
          >
            < DeleteIcon sx={{ color: " red" }} />
          </Button>
        ]
      },
    ]
    this.createRows = (data) => data.map((row, index) => ({
      STT: index + 1,
      id: index,
      ...row
    }),
    );
  }

  handleDelete(params) {
    let url = `http://localhost:8080/api/user/cancelTicket`;
    let dataSend = {
      user_id: Number(localStorage.getItem('id')),
      ticket_id: params.row.ticket_id,
      sit_number: params.row.sit_number
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
        if (data.data) {
          let temp = this.state.dataTable.filter(e => e.STT !== params.row.STT)
          this.setState({
            dataTable: temp,
            alert: {
              isOpen: true,
              type: "info",
              duration: 2000,
              message: "Hủy chuyến thành công",
            }
          })
        } else {
          this.setState({
            alert: {
              isOpen: true,
              type: "warning",
              duration: 2000,
              message: data.message,
            }
          })
        }
      })
  }
  componentDidMount() {
    this.handleViewData()
  }

  handleViewData() {
    let url = `http://localhost:8080/api/user/getTicketByUserId`;
    let dataSend = {
      user_id: Number(localStorage.getItem('id'))
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
        if (data.ticket.length > 0) {
          let temp = this.createRows(data.ticket);
          temp.map(e => {
            e.order_date = moment(e.order_date).format("DD-MM-YYYY HH:mm:ss")
          })
          this.setState({
            dataTable: temp,
          })
        }
      })
  }

  render() {
    return (
      <>
        <Card style={{ marginBottom: "0px" }}>
          <CardContent>
            < Grid item mt={1} md={12}>
              <DataGrid
                className="m-table"
                rows={(this.state.dataTable)
                }
                rowHeight={35}
                columns={this.columns}
                sx={{ height: "78vh" }}
                disableSelectionOnClick
              >

              </DataGrid>
            </Grid>
          </CardContent>
        </Card>
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
    )
  }
}
export default UserAcoountManage;
