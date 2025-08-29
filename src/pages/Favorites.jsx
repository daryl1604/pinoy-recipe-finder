import { useFavorites } from "../store/FavoritesContext";
import { Link } from "react-router-dom";

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="container py-5">
      <h1
        className="text-center fw-bold mb-6"
        style={{ color: "#b8860b" }} 
      >
        My Favorite Recipes
      </h1>

      {favorites.length === 0 ? (
        <p className="text-center text-muted">No favorite recipes yet.</p>
      ) : (
        <div className="row g-4">
          {favorites.map((recipe) => (
            <div key={recipe.id} className="col-12 col-sm-6 col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5
                    className="card-title fw-bold"
                    style={{ color: "#b8860b" }} // brown-gold text
                  >
                    {recipe.name}
                  </h5>
                  <p className="card-text text-muted">
                    {recipe.description?.slice(0, 60)}...
                  </p>
                  <Link
                    to={`/recipe/${recipe.id}`}
                    className="btn mt-auto"
                    style={{
                      backgroundColor: "#b8860b",
                      color: "white",
                      border: "none",
                    }}
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
