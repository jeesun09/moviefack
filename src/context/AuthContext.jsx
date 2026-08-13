"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMovie, setToastMovie] = useState(null);
  const [toastSuccess, setToastSuccess] = useState(null);

  // Load persisted user & wishlist from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("muvi_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      const storedWishlist = localStorage.getItem("muvi_wishlist");
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (e) {
      console.error("Error reading auth state:", e);
    }
  }, []);

  // Save wishlist to localStorage
  const saveWishlist = (newList) => {
    setWishlist(newList);
    try {
      localStorage.setItem("muvi_wishlist", JSON.stringify(newList));
    } catch (e) {
      console.error("Error saving wishlist:", e);
    }
  };

  const login = (email, password, name = "User") => {
    const userData = { email, name: name || email.split("@")[0] };
    setUser(userData);
    localStorage.setItem("muvi_user", JSON.stringify(userData));
    return userData;
  };

  const signup = (name, email, password) => {
    const userData = { name, email };
    setUser(userData);
    localStorage.setItem("muvi_user", JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    setWishlist([]);
    localStorage.removeItem("muvi_user");
    localStorage.removeItem("muvi_wishlist");
  };

  const addToWishlist = (movie) => {
    if (!movie) return;

    if (!user) {
      // User is guest -> Trigger Auth Toast
      setToastMovie(movie);
      setToastOpen(true);
      return;
    }

    // User is logged in -> Toggle wishlist
    const exists = wishlist.some((item) => item.id === movie.id);
    let updated;
    if (exists) {
      updated = wishlist.filter((item) => item.id !== movie.id);
      setToastSuccess(`Removed "${movie.title || movie.titleMain || 'Movie'}" from Wishlist`);
    } else {
      updated = [...wishlist, movie];
      setToastSuccess(`Added "${movie.title || movie.titleMain || 'Movie'}" to Wishlist!`);
    }
    saveWishlist(updated);

    setTimeout(() => setToastSuccess(null), 3000);
  };

  const isMovieInWishlist = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  const closeToast = () => {
    setToastOpen(false);
    setToastMovie(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        wishlist,
        login,
        signup,
        logout,
        addToWishlist,
        isMovieInWishlist,
        toastOpen,
        toastMovie,
        toastSuccess,
        closeToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
