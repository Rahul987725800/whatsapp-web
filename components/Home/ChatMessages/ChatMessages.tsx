import React, { useEffect, useRef } from "react";
import { MessageType } from "types/ChatTypes";
import styles from "./ChatMessages.module.scss";
import Message from "./Message/Message";
interface ChatMessagesProps {
  messages: MessageType[];
}
function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className={styles.ChatMessages}>
      {messages.map((message, i) => (
        <Message key={i} message={message} />
      ))}
    </div>
  );
}

export default ChatMessages;
