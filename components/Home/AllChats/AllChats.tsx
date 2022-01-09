import React from "react";
import { UserType } from "types/ChatTypes";
import styles from "./AllChats.module.scss";
import ChatItem from "./ChatItem/ChatItem";

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
  return (
    <div className={styles.AllChats}>
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
