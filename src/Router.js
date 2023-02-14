import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import Login from "./pages/login/index.js";
import Register from "./pages/register/Register";
import Ticketdetails from "./pages/ticket/TicketDetails";
function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/ticketdetails" element={<Ticketdetails />} />

            </Routes>
        </BrowserRouter>
    );
}
export default Router;
