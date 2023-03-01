import { Box, Container, Grid } from '@mui/material';
import { Budget } from '../../components/dashboard/budget'
import { LatestOrders } from '../../components/dashboard/latest-orders'
import { Sales } from '../../components/dashboard/sales'
import { TasksProgress } from '../../components/dashboard/tasks-progress'
import { TotalCustomers } from '../../components/dashboard/total-customers'
import { TotalProfit } from '../../components/dashboard/total-profit'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'
import Footer from '../../components/footer/Footer';

const Page = () => (
  <>
    <h2 style={{ textAlign: 'center', color: 'red' }}>Chào mừng bạn đến với công ty 3 thành viên</h2>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalCustomers />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TasksProgress />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalProfit sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
          </Grid>
          {/* <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid> */}
        </Grid>
      </Container>
    </Box>
    <Footer />
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
