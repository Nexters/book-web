import { useState, useEffect } from "react";
import Home from "./home";
import OnBoarding from "./onboarding";

export default function Main() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("userToken");
    setToken(accessToken);
  }, []);

  if (!token) {
    return <OnBoarding />;
  }

  return <Home />;
}
