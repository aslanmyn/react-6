// src/components/NavBar.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function NavBar() {
    const linkClass = ({ isActive }) =>
        isActive ? "nav-link nav-link--active" : "nav-link";
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
        <header className="nav">
            <div className="nav-inner">
                <Link to="/" className="nav-brand">
                    My Catalog
                </Link>

                <nav className="nav-links">
                    <NavLink to="/" className={linkClass} end>
                        Home
                    </NavLink>
                    <NavLink to="/about" className={linkClass}>
                        About
                    </NavLink>
                    <NavLink to="/items" className={linkClass}>
                        Items
                    </NavLink>

                    {!user && (
                        <>
                            <NavLink to="/login" className={linkClass}>
                                Login
                            </NavLink>
                            <NavLink to="/signup" className={linkClass}>
                                Signup
                            </NavLink>
                        </>
                    )}

                    {user && (
                        <>
                            <NavLink to="/profile" className={linkClass}>
                                Profile
                            </NavLink>
                            <button
                                type="button"
                                className="btn btn--ghost nav-logout"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
