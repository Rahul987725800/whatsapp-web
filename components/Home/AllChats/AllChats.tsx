import Divider from "components/Shared/Divider/Divider";
import React, { useEffect, useRef, useState } from "react";
import { UserType } from "types/ChatTypes";
import styles from "./AllChats.module.scss";
import ChatItem from "./ChatItem/ChatItem";
import { BiLeftArrowAlt } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { IconType } from "react-icons/lib";

interface AllChatsProps {
  users: UserType[];
  selectedUser?: UserType;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
  onSelected?: () => void;
}

function AllChats({
  users = [],
  selectedUser,
  setSelectedUser,
  onSelected,
}: AllChatsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className={styles.AllChats}>
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Divider />
      {users.map((item, i) => (
        <ChatItem
          key={i}
          name={item.name}
          message={item.phone}
          time="yesterday"
          selectChat={() => {
            onSelected?.();
            setSelectedUser(item);
          }}
          selected={!!selectedUser && selectedUser.phone === item.phone}
        />
      ))}
    </div>
  );
}

export default AllChats;
interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
const SearchInput = ({ searchTerm, setSearchTerm }: SearchInputProps) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    console.log({ editing });
  }, [editing]);
  return (
    <div className={styles.searchInputContainer}>
      <RotatingIcon
        Icon={
          <BiLeftArrowAlt
            fontSize={26}
            style={{ transform: "translateY(-2px)" }}
          />
        }
        show={editing}
        onClick={() => {
          setEditing(false);
          setSearchTerm("");
        }}
      />
      <RotatingIcon
        Icon={<AiOutlineSearch fontSize={20} />}
        show={!editing}
        onClick={() => {
          inputRef.current?.focus();
          setEditing(true);
        }}
      />
      <input
        onFocus={() => {
          setEditing(true);
        }}
        ref={inputRef}
        placeholder="Search"
        className={styles.searchInput}
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <BloomingIcon
        show={searchTerm.length > 0}
        onClick={() => {
          setSearchTerm("");
          inputRef.current?.focus();
        }}
      />
    </div>
  );
};
interface RotatingIconProps {
  Icon: any;
  show: boolean;
  onClick: () => void;
}
const RotatingIcon = ({ Icon, show, onClick }: RotatingIconProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          onClick={onClick}
          initial={{
            opacity: 0,
            rotateZ: -90,
          }}
          animate={{
            rotateZ: 0,
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            rotateZ: -90,
          }}
          transition={{
            duration: 0.2,
            type: "tween",
          }}
          className={styles.RotatingIcon}
        >
          {Icon}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
interface BloomingIconProps {
  show: boolean;
  onClick: () => void;
}
const BloomingIcon = ({ show, onClick }: BloomingIconProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          onClick={onClick}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.2, type: "tween" }}
          className={styles.BloomingIcon}
        >
          <MdClose />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
