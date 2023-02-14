import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import GradeIcon from '@mui/icons-material/Grade';
import {
    Box,
    Button,
    IconButton,
    FormControl,
    InputLabel,
    OutlinedInput,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Stack,
    Checkbox,
    Tooltip,
    Divider,
    Grid,
    TextField,
} from "@mui/material";
const Ticketdetails = (props) => {
    const { link, company, star, price, carType } = props
    return (
        <Card sx={{ width: 800, height: 250, display: 'flex' }}>
            <CardMedia
                component="img"
                alt="Transportation"
                sx={{ backgroundColor: 'red', width: 200 }}
                src='http://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg'
/>
            <CardContent sx={{width : 600}}>
                <Stack direction='row' justifyContent="space-between" >
                    <Stack direction='row' spacing={2}>
                        <FormControl fullWidth >
                            <Typography gutterBottom variant="h4">
                                Company
                            </Typography>
                        </FormControl>
                        <Stack direction='row' spacing={0.2}>
                            <Typography gutterBottom variant='inherit'>
                                star4.5
                            </Typography>
                            <GradeIcon sx={{ color: 'black' }} />
                        </Stack>
                    </Stack>
                    <Typography sx={{ color: 'green' }} variant='h4'>
                        100.000đ price
                    </Typography>
                </Stack>
                <Stack>
                    <Typography sx={{ color: 'gray' }} variant='body2'>
                        xe 12 chỗ carType
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}
export default Ticketdetails;