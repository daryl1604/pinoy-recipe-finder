import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <div className="card shadow-sm h-100">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="card-img-top"
        style={{ height: "200px", objectFit: "cover" }}
      />
          <div className="card-body d-flex flex-column">
        <h5
          className="card-title fw-bold"
          style={{ color: "#b8860b" }} 
        >
          {recipe.name}
        </h5>

        {/* Short description */}
        {recipe.description && (
          <p className="card-text text-muted mb-3" style={{ fontSize: "0.9rem" }}>
            {recipe.description}
          </p>
        )}

        {/* Styled button */}
        <Link
          to={`/recipe/${recipe.id}`}
          className="btn mt-auto fw-semibold"
          style={{
            backgroundColor: "#fbc02d",
            borderColor: "#fbc02d",
            color: "#000", // black text for contrast
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#f9a825"; // darker gold on hover
            e.target.style.borderColor = "#f9a825";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#fbc02d";
            e.target.style.borderColor = "#fbc02d";
          }}
        >
          View Recipe 🍴
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;
