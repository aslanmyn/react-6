import { Link, NavLink } from 'react-router-dom'

export default function NavBar() {
    const linkClass = ({ isActive }) => isActive ? 'active' : undefined
    return (
        <nav className="nav">
            <Link to="/" className="brand">My Catalog</Link>
            <ul>
                <li><NavLink to="/" className={linkClass} end>Home</NavLink></li>
                <li><NavLink to="/about" className={linkClass}>About</NavLink></li>
                <li><NavLink to="/items" className={linkClass}>Items</NavLink></li>
                <li><NavLink to="/login" className={linkClass}>Login</NavLink></li>
            </ul>
        </nav>
    )
}
