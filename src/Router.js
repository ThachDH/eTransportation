import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import Login from "./pages/login/index.js";
import Register from "./pages/register/Register";
import TicketPage from "./pages/ticket";
import Ticketdetails from "./pages/ticket/TicketDetails";
import { Generals } from "./pages/admin/Admin";
import Page from "./pages/company";
import AddRoute from "./pages/company/AddRoute";
import AddTrip from "./pages/company/AddTrip";
import AddTicket from "./pages/company/AddTicket";
import UserAccount from "./pages/user/UserAccount";
import ErrorPage from './pages/errorpage/ErrorPage';
import { CompanyPage } from "./pages/company/CompanyPage";
import UserInforManage from "./pages/user/UserInforManage";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/ticketpage" element={<TicketPage />} />
                <Route path="/admin-page" element={<Generals />} />
                {/* <Route path="/admin-page" render={() => { return <Generals /> }}></Route> */}
                <Route path="/company-page" element={<CompanyPage />} />
                <Route path="/company-route" element={<AddRoute />} />
                <Route path="/company-trip" element={<AddTrip />} />
                <Route path="/company-ticket" element={<AddTicket />} />
                <Route path="/user-account-page" element={<UserAccount />} />
                <Route path="/user-manageinfo-page" element={<UserInforManage />} />

                <Route path="/error-page/:id" element={<ErrorPage />} />

            </Routes>
        </BrowserRouter>
    );
}
export default Router;
