import { AnimatePresence, motion } from "framer-motion";
import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem/MenuItem";
interface MenuProps {
  open: boolean;
  menuList: { value: string; func: () => void }[];
}
const transition = { type: "tween", ease: "easeIn", duration: 0.2 };
const Menu = ({ open, menuList }: MenuProps) => {
  return (
    <div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: transition,
            }}
            exit={{
              opacity: 0,
              scale: 0,
              transition: transition,
            }}
            style={{
              width: "min-content",
              transformOrigin: "100% 0",
            }}
          >
            <div className={styles.Menu}>
              {menuList.map((item, i) => (
                <MenuItem key={i} value={item.value} onClick={item.func} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Menu;
