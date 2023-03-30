import { Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React, { PureComponent } from 'react';
import './Chart.scss'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const CustomTooltip = ({ active, payload, label }) => {
  console.log('a', payload)
  if (active && payload && payload.length) {
    return (
      <div className='chuthich'>
        <div className="label">{`Tháng ${label}: ${payload[0].value} VNĐ`}</div>
        <div>{`Số lượng vé: ${payload[0].payload.amt}`}</div>
      </div>
    );
  }

  return null;
};

export default class Chart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      year: '2023',
      totalll: 0
    }
  }
  componentDidMount() {
    this.handleLoad()
  }
  handleLoad(year) {
    let dataSend = {
      company_id: localStorage.getItem('id'),
      year: year ? year : this.state.year
    }
    fetch('http://localhost:8080/api/company/getOutComeByComId', {
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
        let a = 0;
        let arr = data.total_cost_array.map((row) => ({
          name: row.month,
          pv: row.total_amount,
          amt: row.total_ticket_sold
        }))
        data.total_cost_array.map(e=> {
          a += e.total_amount
        })
        this.setState({
          totalll : (a),
          arr: arr
        })
      })
  }
  render() {
    return (
      <>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Doanh thu năm : {this.state.year}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(e) => {
              this.handleLoad(e.target.value)
              this.setState({
                year : e.target.value
              })
            }}
          >
            <MenuItem value={2021}>2021</MenuItem>
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2023}>2023</MenuItem>
          </Select>
        </FormControl>
        <Grid container>

          <Grid xs={9}>
            <BarChart
              className='sodonho'
              width={900}
              height={500}
              margin={{
                top: 10,
                right: 30,
                left: 10,
                bottom: 5,
              }}
              data={this.state.arr}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="pv" fill="#2c5b90" />
            </BarChart>
          </Grid>
          <Grid xs={3}>

            <Card sx={{ margin: '10px' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Tổng doanh thu
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Năm: {this.state.year}
                </Typography>
                <Typography variant="h5" component="div">
                  {this.state.totalll.toLocaleString()} VND
                </Typography>

              </CardContent>

            </Card>
          </Grid>
        </Grid>
      </>



    );
  }
}
