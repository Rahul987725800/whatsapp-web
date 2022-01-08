import classNames from "classnames";
import styles from "./MenuIcon.module.scss";
import { IconType } from "react-icons/lib";
import Menu from "../Menu/Menu";
import { useEffect, useState } from "react";
interface MenuIconProps {
  active?: boolean;
  Icon: IconType;
  menuList?: { value: string; func: () => void }[];
  onClick?: () => void;
}
const MenuIcon = ({
  active = false,
  Icon,
  menuList,
  onClick,
}: MenuIconProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const cb = () => {
      setMenuOpen(false);
    };
    if (menuList) window.addEventListener("click", cb);
    return () => {
      if (menuList) window.removeEventListener("click", cb);
    };
  }, [menuList]);
  return (
    <div
      onClick={(e) => {
        onClick?.();
        e.stopPropagation();
        setMenuOpen((prev) => !prev);
      }}
      className={classNames(styles.MenuIcon, {
        [styles.active]: active || (menuList && menuOpen),
      })}
    >
      <Icon color="#a8aaac" size={20} />
      {menuList && (
        <div className={styles.menuContainer}>
          <Menu menuList={menuList} open={menuOpen} />
        </div>
      )}
    </div>
  );
};
export default MenuIcon;
