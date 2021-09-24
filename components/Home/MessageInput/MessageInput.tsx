import React, { useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { IoMdSend } from "react-icons/io";
import { ImAttachment } from "react-icons/im";
import styles from "./MessageInput.module.scss";
import { FaSmile } from "react-icons/fa";
interface MessageInputProps {
  messageInput: string;
  setMessageInput: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
}
function MessageInput({
  messageInput,
  setMessageInput,
  sendMessage,
}: MessageInputProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className={styles.MessageInput}>
      <FaSmile color="#a8aaac" size={22} className={styles.icon} />
      <ImAttachment color="#a8aaac" size={22} className={styles.icon} />

      <TextareaAutosize
        ref={textAreaRef}
        value={messageInput}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            textAreaRef.current?.blur();
            setTimeout(() => {
              textAreaRef.current?.focus();
            }, 10);
            sendMessage();
          }
        }}
        onChange={(e) => {
          setMessageInput(e.target.value);
        }}
        maxRows={5}
        className={styles.textArea}
      />

      <IoMdSend
        color="#a8aaac"
        size={22}
        className={styles.icon}
        onClick={sendMessage}
      />
    </div>
  );
}

export default MessageInput;
