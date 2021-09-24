import React, { useEffect, useRef } from "react";
import { MessageType } from "types/ChatTypes";
import styles from "./ChatMessages.module.scss";
import Message from "./Message/Message";
interface ChatMessagesProps {
  messages: MessageType[];
}
function ChatMessages({ messages }: ChatMessagesProps) {
  const chatMessagesContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scrollHeight = chatMessagesContainerRef.current?.scrollHeight;
    chatMessagesContainerRef.current?.scrollTo({ top: scrollHeight });
  }, [messages]);
  return (
    <div ref={chatMessagesContainerRef} className={styles.ChatMessages}>
      {messages.map((message, i) => (
        <Message key={i} message={message} />
      ))}
    </div>
  );
}

export default ChatMessages;
