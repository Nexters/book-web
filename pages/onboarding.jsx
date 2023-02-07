import styles from "@/styles/OnBoarding.module.scss";
import axios from "axios";
import { useRouter } from "next/router";

function OnBoarding() {
  const router = useRouter();
  const getUserToken = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/users/token`,
    );
    localStorage.setItem("userToken", res.data.token);
    router.push("home");
  };
  return (
    <div className={styles.bottom}>
      <button className={styles.startButton} onClick={getUserToken}>
        시작하기
      </button>
    </div>
  );
}

export default OnBoarding;
