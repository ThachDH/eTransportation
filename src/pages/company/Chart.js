import { Grid } from '@mui/material';
import React, { PureComponent } from 'react';
import './Chart.scss'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: '1',
        pv: 1,
        amt: 2,
    },
    {
        name: '2',
        pv: 1398,
        amt: 2,
    },
    {
        name: '2',
        pv: 9800,
        amt: 2,
    },
    {
        name: '3',
        pv: 3908,
        amt: 2,
    },
    {
        name: '4',
        pv: 4800,
        amt: 2,
    },
    {
        name: '5',
        pv: 3800,
        amt: 2,
    },
    {
        name: '6',
        pv: 4300,
        amt: 2,
    }, {
        name: '7',
        pv: 4300,
        amt: 2,
    }, {
        name: '8',
        pv: 4300,
        amt: 2,
    },
    {
        name: '9',
        pv: 10000,
        amt: 2,
    },
    {
        name: '10',
        pv: 4300,
        amt: 2,
    },
    {
        name: '11',
        pv: 4300,
        amt: 2,
    },
    {
        name: '12',
        pv: 4300,
        amt: 2,
    },
];
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className='chuthich'>
                <div className="label">{`Tháng ${label}: ${payload[0].value} VNĐ`}</div>
                <div>{`Số lượng vé: ${payload[0].value}`}</div>
            </div>
        );
    }

    return null;
};

export default class Chart extends PureComponent {

    render() {
        return (
            <Grid container className='sodo'>
                <BarChart
                    width={900}
                    height={600}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    data={data}
                    className='sodonho'
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="pv" fill="#2c5b90" />
                </BarChart>
            </Grid>


        );
    }
}
