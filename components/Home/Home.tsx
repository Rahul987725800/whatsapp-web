import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { MdMessage } from "react-icons/md";
import { GoKebabVertical } from "react-icons/go";
import { AiOutlineSearch } from "react-icons/ai";

import styles from "./Home.module.scss";
import AllChats from "./AllChats/AllChats";
import MessageInput from "./MessageInput/MessageInput";
import ChatMessages from "./ChatMessages/ChatMessages";
import { MessageType, UserType } from "types/ChatTypes";
import { useMutation, useQuery, useSubscription } from "urql";
import { useAppSelector } from "store/hooks";
const messageSubscription = `
subscription ($to: String) {
  message(to: $to) {
    text
    to
    from
  }
}
`;
const createMessageMutation = `
mutation ($text: String, $to: String, $from: String) {
  createMessage(text: $text, to: $to, from: $from) {
    message
  }
}
`;
//
const getUsersQuery = `
  query {
    getUsers {
      name
      phone
    }
  }
`;
const getMessagesForUserQuery = `
  query($phone: String) {
    getMessagesForUser(phone: $phone) {
      text
      to
      from
    }
  }
`;
interface HomeProps {}
function Home({}: HomeProps) {
  const user = useAppSelector((state) => state.general.user);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [getUsersResult, reExecuteGetUsersQuery] = useQuery({
    query: getUsersQuery,
  });
  const [getMessagesForUserResult, reExecuteGetMessagesForUserQuery] = useQuery(
    {
      query: getMessagesForUserQuery,
      variables: {
        phone: user.phone,
      },
      pause: !!!user.phone,
    }
  );
  useEffect(() => {
    // console.log(getMessagesForUserResult.data);
    setMessages(getMessagesForUserResult?.data?.getMessagesForUser || []);
  }, [getMessagesForUserResult]);
  const [selectedUser, setSelectedUser] = useState<UserType>();
  const [createMessageResult, createMessage] = useMutation(
    createMessageMutation
  );
  useEffect(() => {
    console.log(selectedUser);
  }, [selectedUser]);
  const [res] = useSubscription(
    {
      query: messageSubscription,
      variables: {
        to: user.phone,
      },
    },
    (_, res) => {
      console.log(res.message);
      setMessages((prev) => [...prev, res.message]);
    }
  );
  const sendMessage = async () => {
    if (messageInput && selectedUser) {
      // console.log(messageInput);
      const messageInputCopy = messageInput;
      setMessages((prev) => [
        ...prev,
        { text: messageInputCopy, to: selectedUser.phone, from: user.phone },
      ]);

      const result = await createMessage({
        text: messageInputCopy,
        to: selectedUser?.phone,
        from: user.phone,
      });
      console.log(result);
      setMessageInput("");
    }
  };
  const chatMessages = useMemo(() => {
    return messages.filter(
      (message) =>
        message.to === selectedUser?.phone ||
        message.from === selectedUser?.phone
    );
  }, [messages, selectedUser]);
  return (
    <div className={styles.Home}>
      <div className={styles.left}>
        <div className={styles.topBar}>
          <div className={styles.profileImageContainer}>
            <Image src="/profile.jpg" alt="profile" width={40} height={40} />
          </div>
          <div className={styles.name}>{user?.name}</div>
          <div style={{ flex: 1 }}></div>
          <MdMessage color="#a8aaac" size={22} />
          <GoKebabVertical color="#a8aaac" size={20} />
        </div>
        <div className={styles.allChatsContainer}>
          <AllChats
            users={getUsersResult.data?.getUsers.filter(
              (u: UserType) => u.phone !== user.phone
            )}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.topBar}>
          <div className={styles.profileImageContainer}>
            <Image src="/profile.jpg" alt="profile" width={40} height={40} />
          </div>
          <div className={styles.name}>{selectedUser?.name}</div>
          <div style={{ flex: 1 }}></div>
          <AiOutlineSearch color="#a8aaac" size={22} />
          <GoKebabVertical color="#a8aaac" size={20} />
        </div>
        <div className={styles.chatMessagesContainer}>
          <ChatMessages messages={chatMessages} />
        </div>

        <div className={styles.messageInputContainer}>
          <MessageInput
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
