import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("email");

        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div className="navbar-container">

                <Link to="/feed" className="navbar-brand">
                    Social Media
                </Link>

                <div className="navbar-links">

                    <Link to="/feed">
                        Home
                    </Link>

                    <Link to="/profile">
                        Profile
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="logout-button"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;