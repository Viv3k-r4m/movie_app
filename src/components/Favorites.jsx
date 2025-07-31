import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../AuthContext";

const MOVIES = {
  "1": "Inception",
  "2": "Interstellar",
  "3": "The Matrix"
};

export default function Favorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const snap = await getDoc(doc(db, "users", user.uid));
      const data = snap.data();
      setFavorites(data?.favorites || []);
    }
    if (user) {
      fetchData();
    }
  }, [user]);

  const removeFavorite = async (movieId) => {
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      favorites: arrayRemove(movieId)
    });

    // Optimistically update UI
    setFavorites((prev) => prev.filter((id) => id !== movieId));
  };

  return (
    <div>
      <h2>Your Favorites</h2>
      <ul>
        {favorites.map((id) => (
          <li key={id}>
            {MOVIES[id] || `Movie ${id}`}
            <button onClick={() => removeFavorite(id)} style={{ marginLeft: '10px' }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
