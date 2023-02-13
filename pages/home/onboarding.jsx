import styles from "@/styles/OnBoarding.module.scss";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function OnBoarding() {
  const router = useRouter();
  const [hadToken, setHadToken] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setHadToken(true);
    }
  }, []);

  const goToHomePage = () => {
    router.push("/home");
  };

  const getUserToken = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/users/token`,
    );
    localStorage.setItem("userToken", res.data.token);
    router.push("home");
  };

  return (
    <div className={styles.container}>
      <img src="/images/onboarding.png" width="100%" />
      <button
        className={styles.startButton}
        onClick={hadToken ? goToHomePage : getUserToken}
      >
        {hadToken ? "홈 화면으로 돌아가기" : "시작하기"}
      </button>
    </div>
  );
}

export default OnBoarding;
