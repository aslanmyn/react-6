// src/App.jsx
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
            <RootLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/items" element={<ItemsList />} />
                    <Route path="/items/:id" element={<ItemDetails />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* защищённый сегмент: только для залогиненного пользователя */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/profile" element={<Profile />} />
                    </Route>

                    {/* опционально 404 */}
                    {/* <Route path="*" element={<p>Page not found</p>} /> */}
                </Routes>
            </RootLayout>
        </BrowserRouter>
    );
}
