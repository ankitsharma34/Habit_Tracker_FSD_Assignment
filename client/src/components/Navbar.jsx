import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        🎯 Habit Tracker
      </Link>

      <div className="navbar-right">
        {user ? (
          <>
            <span className="navbar-user">👋 {user.name}</span>
            <button className="navbar-logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <div className="navbar-auth-links">
            <Link to="/login" className="navbar-link">
              Login
            </Link>
            <Link to="/register" className="navbar-link navbar-link-primary">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
