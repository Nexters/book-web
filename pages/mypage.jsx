import { useRouter } from "next/router";
import styles from "@/styles/Mypage.module.scss";
import Navigation from "@/components/common/Navigation";

const Status = (props) => (
  <div className={styles.status}>
    <div className={styles.status_count}>{props.count}</div>
    <div className={styles.status_type}>{props.type}</div>
  </div>
);

const Menu = (props) => {
  const router = useRouter();
  if (props.isEmail) {
    return (
      <div
        className={styles.menu}
        onClick={() => router.push("/registerEmail")}
      >
        <div className={styles.menu_title}>
          <img src="/images/email.svg" alt="email" />
          <div className={styles.menu_text_email}>
            이메일 등록하고 웹에서 보기
          </div>
        </div>
        <img src="/images/rightArrow.svg" alt="more" />
      </div>
    );
  }
  return (
    <div className={styles.menu} onClick={props.onClick}>
      <div className={styles.menu_title}>
        <img src={props.img} alt="img" />
        <div className={styles.menu_text}>{props.text}</div>
      </div>
      <img src="/images/rightArrow.svg" alt="more" />
    </div>
  );
};

function Mypage() {
  const router = useRouter();

  return (
    <div>
      <div className={styles.title}>내정보</div>
      <div className={styles.status_container}>
        <Status count="999" type="완독" />
        <Status count="999" type="메모" />
        <Status count="999d" type="읽은날" />
      </div>
      <Menu isEmail />
      <div className={styles.division}></div>
      <div>
        <Menu
          img="/images/opinion.svg"
          text="의견 보내기"
          onClick={() => router.push("https://forms.gle/ZPm3G3QyRKknpyS16")}
        />
        <Menu img="/images/star.svg" text="리뷰 쓰기" />
        <Menu img="/images/invite.svg" text="친구 초대하기" />
        <Menu img="/images/made.svg" text="만든 사람" />
      </div>
      <Navigation />
    </div>
  );
}
export default Mypage;
