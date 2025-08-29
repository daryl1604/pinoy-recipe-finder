import { Link } from "react-router-dom";
import { useFavorites } from "../store/FavoritesContext";

function Header() {
  const { favorites } = useFavorites();

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{
        background: "linear-gradient(90deg, #d7a94b, #6d4c41)", // color ng border
        borderBottom: "5px solid transparent",
        borderImage: "linear-gradient(90deg, #f9a825, #8d6e63) 1", 
      }}

    >
      <div className="container">
        {/* Brand / Title */}
        <Link
          to="/"
          className="navbar-brand fw-bold"
          style={{
            fontFamily: "'Merienda', cursive",
            fontSize: "1.8rem",
            color: "white",
            textShadow: "1px 1px 4px rgba(0,0,0,0.3)",
          }}
        >
          🍲 Pinoy Food Recipes 🍲
        </Link>

        {/* Navbar Toggler (for mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: "white" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto fs-5">
            <li className="nav-item">
              <Link to="/" className="nav-link fw-semibold text-white">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/favorites"
                className="nav-link fw-bold"
                style={{ color: "#ffeb3b" }} // favorites button
              >
                Favorites ({favorites.length})
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
