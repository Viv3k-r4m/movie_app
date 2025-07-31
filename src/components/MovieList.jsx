import React from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuth } from "../AuthContext";

const MOVIES = [
  { id: "1", title: "Inception" },
  { id: "2", title: "Interstellar" },
  { id: "3", title: "The Matrix" }
];

export default function MovieList() {
  const { user } = useAuth();

  if (!user) return null; 

  const addFavorite = async (movieId) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, { favorites: [] });
      }

      await updateDoc(userRef, {
        favorites: arrayUnion(movieId),
      });

      alert("Added to favorites!");
    } catch (err) {
      console.error("Failed to add favorite:", err);
      alert("Failed to add favorite. Check the console for details.");
    }
  };

  return (
    <div>
      <h2>Movies</h2>
      <ul>
        {MOVIES.map(m => (
          <li key={m.id}>
            {m.title}{" "}
            <button onClick={() => addFavorite(m.id)}>★ Favorite</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
