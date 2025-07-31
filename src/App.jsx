import React from "react";
import { useAuth } from "./AuthContext";
import SignInWithGoogle from "./components/SignInWithGoogle";
import MovieList from "./components/MovieList";
import Favorites from "./components/Favorites";

export default function App() {
  const { user, signOut } = useAuth();

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🎬 Movie App</h1>
      {user ? (
        <>
          <p>Signed in as {user.email}</p>
          <button onClick={signOut}>Sign Out</button>
          <MovieList />
          <Favorites />
        </>
      ) : (
        <SignInWithGoogle />
      )}
    </div>
  );
}
