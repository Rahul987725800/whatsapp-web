import React from "react";
import { UserType } from "types/ChatTypes";
import styles from "./AllChats.module.scss";
import ChatItem from "./ChatItem/ChatItem";

interface AllChatsProps {
  users: UserType[];
  selectedUser?: UserType;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
}

function AllChats({
  users = [],
  selectedUser,
  setSelectedUser,
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
            setSelectedUser(item);
          }}
          selected={!!selectedUser && selectedUser.phone === item.phone}
        />
      ))}
    </div>
  );
}

export default AllChats;
