import { useParams } from "react-router-dom"; //para makuha yung :id sa URL
import { useEffect, useState } from "react"; //  useState  para mag-store ng recipe data sa state.. useeffect para mag-run ng code kapag nagbago yung id (ex: fetch new recipe details)

import { useFavorites } from "../store/FavoritesContext"; // para mag-add/remove sa favorites

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    fetch("/recipes.json")
      .then((res) => res.json())
      .then((data) => setRecipe(data.find((r) => r.id.toString() === id)));
  }, [id]);

  if (!recipe)
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading recipe...</p>
      </div>
    );

  const isFavorite = favorites.some((r) => r.id === recipe.id); // check if nasa favorites na

  // instuctins
  let steps = [];
  if (recipe.instructions) {
    if (Array.isArray(recipe.instructions)) {
      steps = recipe.instructions;
    } else if (typeof recipe.instructions === "string") {
      steps = recipe.instructions
        .split(/\.|\n/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
    }
  }

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Background overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(8px)",
        }}
      ></div>

      {/* Recipe Card */}
      <div className="container position-relative py-5">
        <div
          className="card shadow-lg border-0 rounded-4 mx-auto"
          style={{ maxWidth: "800px" }}
        >
          {/* Recipe Image */}
          <img
            src={recipe.image}
            alt={recipe.name}
            className="card-img-top rounded-top"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />

          <div className="card-body p-4">
            {/* Title */}
            <h1
              className="card-title fw-bold mb-4 text-center"
              style={{ color: "#b8860b" }} // change color
            >
              {recipe.name}
            </h1>

            {/* Ingredients */}
            <h4 className="text-secondary fw-semibold">📝 Ingredients</h4>
            <ul className="list-group list-group-flush mb-4">
              {recipe.ingredients?.map((i, idx) => (
                <li key={idx} className="list-group-item">
                  {i}
                </li>
              ))}
            </ul>

            {/* Instructions */}
            <h4 className="text-secondary fw-semibold">👨‍🍳 Instructions</h4>
            {steps.length > 0 ? (
              <ol className="list-group list-group-numbered mb-4">
                {steps.map((step, idx) => (
                  <li key={idx} className="list-group-item">
                    {step}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-muted">No instructions available.</p>
            )}

            {/* Favorite Button */}
            <div className="text-center">
              <button
                onClick={() =>
                  isFavorite ? removeFavorite(recipe.id) : addFavorite(recipe)
                }
                className={`btn ${
                  isFavorite ? "btn-danger" : "btn-primary"
                } mt-3 px-4`}
              >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
