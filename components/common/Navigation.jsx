import Link from "next/link";

import styles from "@/styles/Navigation.module.scss";
import { useRouter } from "next/router";

const navButtons = [
  {
    label: "기록",
    path: "/record",
    icon: "아이콘",
  },
  {
    label: "서재",
    path: "/library",
    icon: "아이콘",
  },
  {
    label: "내 정보",
    path: "/mypage",
    icon: "아이콘",
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
        <div className={styles.icon}>{props.icon}</div>
        <span className={styles.label}>{props.label}</span>
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
