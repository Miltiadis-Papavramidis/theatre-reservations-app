import { createContext, useState } from "react";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {

  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (show) => {

    const exists = favorites.find(
      (item) => item.title === show.title
    );

    if (exists) {

      setFavorites(
        favorites.filter(
          (item) => item.title !== show.title
        )
      );

    } else {

      setFavorites([...favorites, show]);

    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}