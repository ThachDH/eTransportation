import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import Login from "./pages/login/index.js";
import Register from "./pages/register/Register";
import TicketPage from "./pages/ticket";
import Ticketdetails from "./pages/ticket/TicketDetails";
import { Generals } from "./pages/admin/Admin";
import Page from "./pages/dashboard";
function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/ticketpage" element={<TicketPage />} />
                <Route path="/ticketdetails" element={<Ticketdetails />} />
                <Route path="/admin-page" element={<Generals />} />
                <Route path="/company-page" element={<Page />} />

            </Routes>
        </BrowserRouter>
    );
}
export default Router;
