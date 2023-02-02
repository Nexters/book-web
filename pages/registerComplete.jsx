import { useRouter } from "next/router";
import styles from "@/styles/Mypage.module.scss";

function RegisterComplete() {
  const router = useRouter();

  return (
    <div>
      <div className={styles.btn_container}>
        <img
          src="/images/backButton.svg"
          alt="back"
          className={styles.btn}
          onClick={() => router.back()}
        />
      </div>
      <div className={styles.main_container}>
        <div className={styles.text_container}>
          <div className={styles.text_main}>등록한 메일로 링크를 보냈어요</div>
          <div className={styles.text_sub}>
            {router.query.email} 메일을 확인해주세요.
          </div>
        </div>
        <div className={styles.icon_container}>
          <img src="/images/check.svg" alt="check" width="96px" />
        </div>
        <div
          className={styles.btn_bottom_active}
          onClick={() => router.push("/mypage")}
        >
          확인
        </div>
      </div>
    </div>
  );
}
export default RegisterComplete;
