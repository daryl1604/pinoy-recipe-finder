// Import ng useState at useEffect hooks
import { useState, useEffect } from "react";
// Import ng RecipeCard component (pang display ng recipe info)
import RecipeCard from "../components/RecipeCard";

function Home() {
  // State para sa list ng recipes (initial = empty array)
  // setRecipes = pang update ng recipes kapag na-fetch na yung data
  const [recipes, setRecipes] = useState([]);

  // State para sa search input (initial = "")
  // setSearch = pang update kapag nagta-type user
  const [search, setSearch] = useState("");

  // useEffect = auto-run kapag unang render
  // dito kino-fetch yung recipes.json para makuha data ng recipes
  useEffect(() => {
    fetch("/recipes.json") // kuha file
      .then((res) => res.json()) // convert to JSON
      .then((data) => setRecipes(data)); // lagay sa state
  }, []); // [] = run lang once (sa mount)

  // Filtered recipes = based sa search input
  const filtered = recipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        // Background image
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Overlay na madilim + blur effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(8px)",
        }}
      ></div>

      {/* Content sa ibabaw ng overlay */}
      <div className="container position-relative py-5 flex-grow-1">
        {/* Search bar */}
        <div className="input-group mb-5">
          <input
            type="text"
            placeholder="🔍 Search delicious recipes..."
            className="form-control form-control-lg"
            value={search} // value galing sa state
            onChange={(e) => setSearch(e.target.value)} // update state pag may tinype
          />
          <button className="btn btn-warning btn-lg fw-bold" type="button">
            🍲 Search
          </button>
        </div>

        {/* Recipe grid */}
        <div className="row g-4">
          {filtered.length > 0 ? (
            // Pag may recipe, i-loop gamit map()
            filtered.map((recipe) => (
              <div key={recipe.id} className="col-12 col-sm-6 col-md-4">
                <RecipeCard recipe={recipe} />
              </div>
            ))
          ) : (
            // Pag wala mahanap
            <p className="text-white fs-4 text-center mt-5">
              No recipes found 👩‍🍳
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Export para magamit sa routing
export default Home;
