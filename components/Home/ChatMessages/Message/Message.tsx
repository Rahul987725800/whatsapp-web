import classNames from "classnames";
import React from "react";
import { useAppSelector } from "store/hooks";
import { MessageType } from "types/ChatTypes";
import styles from "./Message.module.scss";
interface MessageProps {
  message: MessageType;
}
function Message({ message }: MessageProps) {
  const user = useAppSelector((state) => state.general.user);
  return (
    <div
      className={classNames(
        styles.Message,
        styles[message.from === user.phone ? "sent" : "received"]
      )}
    >
      <div className={styles.block}>{message.text}</div>
    </div>
  );
}

export default Message;
