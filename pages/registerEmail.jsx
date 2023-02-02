import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Mypage.module.scss";

function RegisterEmail() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(e.target.value)) {
      setIsEmail(false);
    } else {
      setIsEmail(true);
    }
  };

  const handleSubmit = () => {
    if (isEmail) {
      router.push(
        {
          pathname: "/registerComplete",
          query: { email: email },
        },
        "/registerComplete",
      );
    }
  };

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
        <div>
          <div className={styles.text_container}>
            <div className={styles.text_main}>이메일을 입력해주세요</div>
            <div className={styles.text_sub}>
              웹에서도 볼 수 있는 링크를 보내드릴게요.
            </div>
          </div>
          <div className={styles.input_container}>
            <input
              type="search"
              placeholder="이메일입력"
              value={email}
              onChange={onChangeEmail}
              className={
                isEmail || email === "" ? styles.input : styles.input_error
              }
            />
            {isEmail || email === "" ? null : (
              <div className={styles.text_error}>
                올바른 이메일 형식이 아니에요
              </div>
            )}
          </div>
        </div>
        <div
          className={isEmail ? styles.btn_bottom_active : styles.btn_bottom}
          onClick={handleSubmit}
        >
          다음
        </div>
      </div>
    </div>
  );
}
export default RegisterEmail;
