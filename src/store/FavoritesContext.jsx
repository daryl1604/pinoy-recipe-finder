import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (recipe) => {
    if (!favorites.find((f) => f.id === recipe.id)) {
      setFavorites([...favorites, recipe]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((r) => r.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// ✅ This is required
export const useFavorites = () => useContext(FavoritesContext);
