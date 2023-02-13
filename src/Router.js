import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import Login from "./pages/login/index.js";
function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;
