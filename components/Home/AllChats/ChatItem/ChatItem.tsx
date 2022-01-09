import React from "react";
import styles from "./ChatItem.module.scss";
import Image from "next/image";
import classNames from "classnames";
import Divider from "components/Shared/Divider/Divider";
interface ChatItemProps {
  name: string;
  message: string;
  time: string;
  selected: boolean;
  selectChat: React.MouseEventHandler<HTMLDivElement>;
}
function ChatItem({
  name,
  message,
  time,
  selected,
  selectChat,
}: ChatItemProps) {
  return (
    <div
      className={classNames(styles.ChatItem, { [styles.selected]: selected })}
      onClick={selectChat}
    >
      <div className={styles.image}>
        <Image src="/profile.jpg" alt="profile" width={50} height={50} />
      </div>
      <div className={styles.details}>
        <div className={styles.row}>
          <div className={styles.name}>{name}</div>
          <div className={styles.time}>{time}</div>
        </div>
        <div className={styles.message}>{message}</div>
        <div className={styles.divider}>
          <Divider />
        </div>
      </div>
    </div>
  );
}

export default ChatItem;
