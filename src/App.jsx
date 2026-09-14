import { useState } from "react";
import SplashScreen from "./component/SplashScreen";
import Home from "./pages/Home";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && (
        <SplashScreen />
      )}

      <Home />

      {showSplash && (
        <button
          className="skip-splash"
          onClick={() => setShowSplash(false)}
        >
          Skip
        </button>
      )}
    </>
  );
}

export default App;