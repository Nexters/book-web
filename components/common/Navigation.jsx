import Link from "next/link";
import { useRouter } from "next/router";

import styles from "@/styles/Navigation.module.scss";

const navButtons = [
  {
    label: "기록",
    path: "/record",
    icon: "/images/record.svg",
  },
  {
    label: "서재",
    path: "/library",
    icon: "/images/library.svg",
  },
  {
    label: "내 정보",
    path: "/mypage",
    icon: "/images/mypage.svg",
  },
];

const NavButton = (props) => {
  const router = useRouter();

  return (
    <Link href={props.path}>
      <div
        className={
          router.pathname === props.path ? styles.active : styles.navButton
        }
      >
        <img className={styles.icon} src={props.icon} alt="아이콘" />
        <div className={styles.label}>{props.label}</div>
      </div>
    </Link>
  );
};

const Navigation = () => {
  return (
    <div className={styles.navBar}>
      {navButtons.map((button) => (
        <NavButton
          key={button.path}
          path={button.path}
          label={button.label}
          icon={button.icon}
        />
      ))}
    </div>
  );
};

export default Navigation;
