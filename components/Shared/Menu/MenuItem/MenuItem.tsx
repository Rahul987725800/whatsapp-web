import styles from "./MenuItem.module.scss";
interface MenuItemProps {
  value: string;
  onClick: () => void;
}
const MenuItem = ({ value, onClick }: MenuItemProps) => {
  return (
    <div className={styles.MenuItem} onClick={onClick}>
      {value}
    </div>
  );
};
export default MenuItem;
