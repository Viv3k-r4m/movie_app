import React from "react";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuth } from "../AuthContext";

const MOVIES = [
  { id: "1", title: "Inception" },
  { id: "2", title: "Interstellar" },
  { id: "3", title: "The Matrix" }
];

export default function MovieList() {
  const { user } = useAuth();

  const addFavorite = async (movieId) => {
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      favorites: arrayUnion(movieId)
    });
    alert("Added to favorites!");
  };

  return (
    <div>
      <h2>Movies</h2>
      <ul>
        {MOVIES.map(m => (
          <li key={m.id}>
            {m.title} <button onClick={() => addFavorite(m.id)}>★ Favorite</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
