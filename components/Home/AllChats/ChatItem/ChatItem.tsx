import React, { useEffect, useState } from "react";
import styles from "./ChatItem.module.scss";
import Image from "next/image";
import classNames from "classnames";
import Divider from "components/Shared/Divider/Divider";
interface ChatItemProps {
  searchTerm: string;
  name: string;
  message: string;
  time: string;
  selected: boolean;
  selectChat: React.MouseEventHandler<HTMLDivElement>;
}
function ChatItem({
  searchTerm,
  name,
  message,
  time,
  selected,
  selectChat,
}: ChatItemProps) {
  const [nameMatchStartIndex, setNameMatchStartIndex] = useState(-1);
  useEffect(() => {
    const startIndex = name.toLowerCase().search(searchTerm.toLowerCase());
    setNameMatchStartIndex(startIndex);
  }, [searchTerm, name]);
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
          <div className={styles.name}>
            <span>{name.substring(0, nameMatchStartIndex)}</span>
            <span className={styles.highlight}>
              {name.substring(
                nameMatchStartIndex,
                nameMatchStartIndex + searchTerm.length
              )}
            </span>
            <span>
              {name.substring(nameMatchStartIndex + searchTerm.length)}
            </span>
          </div>
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
