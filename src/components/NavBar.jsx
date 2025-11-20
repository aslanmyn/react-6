// src/components/NavBar.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function NavBar() {
    const linkClass = ({ isActive }) => (isActive ? "active" : undefined);
    const { user, logout } = useAuth();
    const nav = useNavigate();

    async function handleLogout() {
        try {
            await logout();
            nav("/login", { replace: true });
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <nav className="nav">
            <Link to="/" className="brand">
                My Catalog
            </Link>

            <ul>
                <li>
                    <NavLink to="/" className={linkClass} end>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={linkClass}>
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/items" className={linkClass}>
                        Items
                    </NavLink>
                </li>

                {!user && (
                    <>
                        <li>
                            <NavLink to="/login" className={linkClass}>
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/signup" className={linkClass}>
                                Signup
                            </NavLink>
                        </li>
                    </>
                )}

                {user && (
                    <>
                        <li>
                            <NavLink to="/profile" className={linkClass}>
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <button type="button" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}
