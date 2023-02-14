import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import GradeIcon from '@mui/icons-material/Grade';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
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
import DialogTicketDetails from '../../components/dialog/DialogTicketDetails';

const Ticketdetails = (props) => {
    const closeDialog = (event) => {
        setDialog({isOpen :false})
    }

    const { link, company, star, price, carType, carBlank } = props
    const [dialog, setDialog] = React.useState(
        {
            isOpen: false,
            data: null,
        },
    )
    return (
        <Card sx={{ width: 800, height: 250, display: 'flex', backgroundColor: '#EEE8CD' }}>
            <CardMedia
                component="img"
                alt="Transportation"
                sx={{ backgroundColor: 'red', width: 200 }}
                src='http://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg'
            />
            <CardContent sx={{ width: 600 }}>
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
                <Grid container spacing={2} sx={{ mt: 1 }} >
                    <Grid item xs={6}>
                        <Stack direction='row' spacing={2}>
                            <Typography align="right" sx={{ fontWeight: 'bold' }}>Thời gian -- Địa điểm</Typography>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container  >
                    <Stack></Stack>
                    <Grid item xs={6}>
                        <Stack direction='row' spacing={0} sx={{ ml: 4 }}>
                            <ArrowDownwardIcon sx={{ fontSize: 35 }} />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={{ color: 'gray' }} align="right" variant='body2' >
                            xe còn 12 chỗ trống
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} >
                    <Grid item xs={6}>
                        <Stack direction='row' spacing={2}>
                            <Typography align="right" sx={{ fontWeight: 'bold' }}>Thời gian -- Địa điểm</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={6} >
                        <Button
                            type="button"
                            variant="contained"
                            sx={{ width: 150, backgroundColor: "#f0d455", ml: 16 }}
                        >
                            Tìm chuyến
                        </Button>
                    </Grid>
                </Grid>
                <Stack alignItems="center">
                    <Button
                        type="button"
                        variant="text"
                        sx={{ width: 200, fontSize: 9 }}
                        onClick={() => setDialog({
                            isOpen: true
                        })}
                    >
                        Thông tin chi tiết vé xe {<DirectionsBusIcon />}
                    </Button>
                </Stack>
                <DialogTicketDetails
                    dialog={dialog}
                    handleCloseDialog={(data) => closeDialog(data)}

                />
            </CardContent>
        </Card>
    );
}
export default Ticketdetails;