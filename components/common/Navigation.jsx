import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import styles from "@/styles/Navigation.module.scss";

const navButtons = [
  {
    label: "홈",
    path: "/home",
    icon: "home",
  },
  {
    label: "내서재",
    path: "/library",
    icon: "library",
  },
  {
    label: "내정보",
    path: "/mypage",
    icon: "mypage",
  },
];

const NavButton = (props) => {
  const router = useRouter();
  const isActive = router.pathname === props.path;
  return (
    <Link href={props.path}>
      <div className={isActive ? styles.active : styles.navButton}>
        <div
          className={cn(
            styles.icon,
            styles[`icon_${props.icon}`],
            isActive && styles.icon_active,
          )}
        ></div>
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
