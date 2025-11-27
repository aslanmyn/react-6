
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import ItemsList from "./pages/ItemsList";
import ItemDetails from "./pages/ItemDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ProtectedRoute from "./auth/ProtectedRoute";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {}
                <Route path="/" element={<RootLayout />}>
                    {/* главная */}
                    <Route index element={<Home />} />

                    {/* обычные страницы */}
                    <Route path="about" element={<About />} />
                    <Route path="items" element={<ItemsList />} />
                    <Route path="items/:id" element={<ItemDetails />} />

                    {/* auth */}
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />

                    {/* защищённый роут */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="profile" element={<Profile />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
